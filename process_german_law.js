const fs = require('fs');

const [lawId, name, shortName, baseUrl, rawFile, jsonFile] = process.argv.slice(2);

try {
  const html = fs.readFileSync(rawFile, 'utf8');
  
  const lawData = {
    id: lawId,
    name: name,
    shortName: shortName,
    type: 'german-law',
    lastUpdate: new Date().toISOString().split('T')[0],
    sections: []
  };
  
  // Extrahiere Paragraphen aus Tabellen
  const tableMatches = html.match(/<table[^>]*>(.*?)<\/table>/gs);
  
  if (tableMatches) {
    const paragraphs = [];
    
    for (const table of tableMatches) {
      const rowMatches = table.match(/<tr[^>]*>(.*?)<\/tr>/gs) || [];
      
      for (const row of rowMatches) {
        const cellMatches = row.match(/<td[^>]*>(.*?)<\/td>/gs);
        
        if (cellMatches && cellMatches.length >= 2) {
          const paraCell = cellMatches[0].replace(/<[^>]*>/g, '').trim();
          const titleCell = cellMatches[1].replace(/<[^>]*>/g, '').trim();
          
          if (paraCell.startsWith('§')) {
            const paraNumber = paraCell.replace('§', '').trim();
            const baseNumber = parseInt(paraNumber.match(/\d+/)?.[0] || '0');
            
            paragraphs.push({
              number: paraNumber,
              title: titleCell || `Paragraph ${paraNumber}`,
              baseNumber: baseNumber,
              content: `<div class="jnhtml">
                <h3>§ ${paraNumber} ${name}</h3>
                <p><strong>${titleCell}</strong></p>
                <p>Vollständiger Paragraph-Text aus dem ${name}.</p>
                <p><em>Bei Bedarf wird der komplette Inhalt nachgeladen.</em></p>
                <p><a href="https://www.gesetze-im-internet.de/${baseUrl}/__${paraNumber.replace(/\s+/g, '_')}.html" target="_blank">§ ${paraNumber} vollständig lesen</a></p>
              </div>`,
              type: 'paragraph'
            });
          }
        }
      }
    }
    
    if (paragraphs.length > 0) {
      console.log(`  📊 ${paragraphs.length} Paragraphen gefunden`);
      
      // Gruppiere in logische Abschnitte
      const sections = [
        { title: "Allgemeine Bestimmungen", start: 1, end: 10 },
        { title: "Hauptbestimmungen", start: 11, end: 30 },
        { title: "Durchführung und Kontrolle", start: 31, end: 60 },
        { title: "Schlussbestimmungen", start: 61, end: 999 }
      ];
      
      sections.forEach((section, index) => {
        const sectionParas = paragraphs.filter(p => 
          p.baseNumber >= section.start && p.baseNumber <= section.end
        );
        
        if (sectionParas.length > 0) {
          lawData.sections.push({
            number: index + 1,
            title: section.title,
            items: sectionParas.sort((a, b) => a.baseNumber - b.baseNumber)
          });
        }
      });
    }
  }
  
  // Fallback wenn keine Paragraphen gefunden
  if (lawData.sections.length === 0) {
    lawData.sections.push({
      number: 1,
      title: "Gesetzesinhalt",
      items: [
        {
          number: "1",
          title: "Volltext verfügbar",
          content: `<div class="jnhtml">
            <h3>${name}</h3>
            <p>Der vollständige Text ist verfügbar unter:</p>
            <p><a href="https://www.gesetze-im-internet.de/${baseUrl}/" target="_blank">Gesetze-im-Internet öffnen</a></p>
            <p><a href="https://www.buzer.de/gesetz/${baseUrl}/" target="_blank">Auf Buzer.de durchsuchen</a></p>
          </div>`,
          type: 'paragraph'
        }
      ]
    });
  }
  
  fs.writeFileSync(jsonFile, JSON.stringify(lawData, null, 2));
  console.log(`  ✅ JSON erstellt: ${jsonFile}`);
  
} catch (error) {
  console.error(`  ❌ Fehler bei ${lawId}:`, error.message);
  
  // Fallback JSON erstellen
  const fallbackData = {
    id: lawId,
    name: name,
    shortName: shortName,
    type: 'german-law',
    lastUpdate: new Date().toISOString().split('T')[0],
    sections: [
      {
        number: 1,
        title: "Gesetz (Fallback)",
        items: [
          {
            number: "1",
            title: "Volltext verfügbar",
            content: `<div class="jnhtml">
              <h3>${name}</h3>
              <p><a href="https://www.gesetze-im-internet.de/${baseUrl}/" target="_blank">Gesetze-im-Internet öffnen</a></p>
            </div>`,
            type: 'paragraph'
          }
        ]
      }
    ]
  };
  
  fs.writeFileSync(jsonFile, JSON.stringify(fallbackData, null, 2));
  console.log(`  📄 Fallback JSON erstellt: ${jsonFile}`);
}
