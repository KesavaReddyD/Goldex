import fs from 'fs';
import { parse } from 'csv-parse/sync';
import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function importGoldData(csvPath: string) {
  try {
    // Read CSV file
    const data = fs.readFileSync(csvPath, 'utf8');
    
    // Parse CSV
    const records = parse(data, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });
    
    console.log(`Found ${records.length} records to import`);
    console.log("Sample record:", records[0]);

    // Get column names from first record
    const firstRecord = records[0];
    const dateKey = Object.keys(firstRecord).find(key => key.toLowerCase().includes('date'));
    const priceKey = Object.keys(firstRecord).find(key => key === 'Price');
    const openKey = Object.keys(firstRecord).find(key => key === 'Open');
    const highKey = Object.keys(firstRecord).find(key => key === 'High');
    const lowKey = Object.keys(firstRecord).find(key => key === 'Low');
    const volKey = Object.keys(firstRecord).find(key => key === 'Vol');
    const changeKey = Object.keys(firstRecord).find(key => key.includes('Change'));
    
    console.log("Column names detected:", { 
      dateKey, priceKey, openKey, highKey, lowKey, volKey, changeKey 
    });
    
    if (!dateKey || !priceKey) {
      throw new Error("Required columns (Date, Price) not found in CSV file");
    }
    
    // Process each record
    let importedCount = 0;
    let errorCount = 0;
    
    for (const record of records) {
      try {
        // Parse date (DD-MM-YYYY)
        const dateParts = record[dateKey].split('-');
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // JS months are 0-indexed
        const year = parseInt(dateParts[2], 10);
        const date = new Date(year, month, day);
        
        // Parse price values (remove commas and quotes)
        const cleanValue = (value: string) => {
          if (!value || value.trim() === '') return 0;
          return parseFloat(value.replace(/["',]/g, ''));
        };
        
        const closePrice = cleanValue(record[priceKey]);
        const openPrice = openKey ? cleanValue(record[openKey]) : 0;
        const highPrice = highKey ? cleanValue(record[highKey]) : 0;
        const lowPrice = lowKey ? cleanValue(record[lowKey]) : 0;
        
        // Handle volume (might be empty)
        const volume = volKey && record[volKey] && record[volKey].trim() !== '' 
          ? parseInt(record[volKey].replace(/["',]/g, ''), 10) 
          : null;
        
        // Parse change percentage (remove % sign)
        const changePercent = changeKey && record[changeKey]
          ? parseFloat(record[changeKey].replace(/["%]/g, '')) 
          : ((closePrice - openPrice) / openPrice) * 100;
        
        // Calculate change amount
        const changeAmount = closePrice - openPrice;
        
        // Create or update record in database
        await prisma.goldPrice.upsert({
          where: { date },
          update: {
            openPrice,
            highPrice,
            lowPrice,
            closePrice,
            volume,
            changeAmount,
            changePercent
          },
          create: {
            date,
            openPrice,
            highPrice,
            lowPrice,
            closePrice,
            volume,
            changeAmount,
            changePercent
          }
        });
        
        importedCount++;
        
        if (importedCount % 100 === 0) {
          console.log(`Processed ${importedCount} records...`);
        }
      } catch (error) {
        console.error(`Error processing record:`, record, error);
        errorCount++;
      }
    }
    
    console.log(`Import completed: ${importedCount} records imported, ${errorCount} errors`);
  } catch (error) {
    console.error('Import failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the import using the CSV file path
importGoldData('./scripts/XAU_USD.csv')
  .then(() => console.log('Script execution complete'))
  .catch(error => console.error('Script execution failed:', error));
