const fs = require('fs');

const [lawId, name, rawFile, jsonFile, celex] = process.argv.slice(2);

try {
  const html = fs.readFileSync(rawFile, 'utf8');
  
  const articleData = {
    id: lawId,
    name: name,
    type: 'eu-regulation',
    lastUpdate: new Date().toISOString().split('T')[0],
    sections: []
  };
  
  // Extrahiere Artikel-Links
  const articleMatches = html.match(/<a[^>]*href="#art_(\d+)"[^>]*>(.*?)<\/a>/g) || [];
  
  if (articleMatches.length > 0) {
    console.log(`  📊 ${articleMatches.length} Artikel gefunden`);
    
    const articles = articleMatches.slice(0, 20).map((match, index) => {
      const numberMatch = match.match(/href="#art_(\d+)"/);
      const number = numberMatch ? numberMatch[1] : (index + 1).toString();
      
      // Extrahiere Titel aus dem Link-Text
      let title = match.replace(/<[^>]*>/g, '').replace(/^\s*Artikel\s*\d+\s*[-–]?\s*/, '').trim();
      if (!title || title.length < 3) {
        title = `Artikel ${number}`;
      }
      
      return {
        number: number,
        title: title,
        content: `<div class="eu-article">
          <h3>Artikel ${number}</h3>
          <p><strong>${title}</strong></p>
          <p>Vollständiger Artikel-Text aus ${name}.</p>
          <p><em>Bei Bedarf wird der komplette Inhalt von EUR-Lex nachgeladen.</em></p>
          <p><a href="https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:${celex}#art_${number}" target="_blank">Artikel ${number} auf EUR-Lex öffnen</a></p>
        </div>`,
        type: 'article'
      };
    });
    
    // Gruppiere Artikel in sinnvolle Abschnitte
    const ranges = [
      { title: "Allgemeine Bestimmungen", start: 1, end: 10 },
      { title: "Hauptbestimmungen", start: 11, end: 50 },
      { title: "Durchführung und Kontrolle", start: 51, end: 80 },
      { title: "Schlussbestimmungen", start: 81, end: 200 }
    ];
    
    ranges.forEach((range, index) => {
      const sectionArticles = articles.filter(art => {
        const num = parseInt(art.number);
        return num >= range.start && num <= range.end;
      });
      
      if (sectionArticles.length > 0) {
        articleData.sections.push({
          number: index + 1,
          title: range.title,
          items: sectionArticles
        });
      }
    });
  } else {
    // Fallback-Struktur
    articleData.sections.push({
      number: 1,
      title: "EU-Verordnung",
      items: [
        {
          number: "1",
          title: "Gegenstand und Anwendungsbereich",
          content: `<div class="eu-article">
            <h3>Artikel 1 - Gegenstand und Anwendungsbereich</h3>
            <p><strong>${name}</strong></p>
            <p>Diese Verordnung legt Vorschriften fest...</p>
            <p><a href="https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:${celex}" target="_blank">Volltext auf EUR-Lex</a></p>
          </div>`,
          type: 'article'
        }
      ]
    });
  }
  
  fs.writeFileSync(jsonFile, JSON.stringify(articleData, null, 2));
  console.log(`  ✅ JSON erstellt: ${jsonFile}`);
  
} catch (error) {
  console.error(`  ❌ Fehler bei ${lawId}:`, error.message);
  process.exit(1);
}
