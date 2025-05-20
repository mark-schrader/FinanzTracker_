


/** Beispielcode für die Verbindung mit MariaDb.
 * Variablen, Berechnungen und Abfragen müssen noch an unsere Vorgaben angepasst werden.
 * Dazu habe ich auch schon kleine Konzepte erstellt, aber hier noch nicht implementiert.
 * 
 */



/**
 * Importiert das `mysql2`-Modul, das für die Verbindung und Interaktion mit MariaDB/MySQL-Datenbanken verwendet wird.
 */
const mysql = require('mysql2');

/**
 * Erstellt eine Verbindung zur MariaDB-Datenbank mit den angegebenen Konfigurationsparametern.
 * - `host`: Der Hostname oder die IP-Adresse des Datenbankservers.
 * - `user`: Der Benutzername für die Authentifizierung.
 * - `password`: Das Passwort für den Benutzer.
 * - `database`: Der Name der zu verwendenden Datenbank.
 */
const db = mysql.createConnection({
  host: 'localhost', // Lokaler Datenbankserver
  user: 'root', // Standard-Benutzername
  password: 'dein_passwort', // Passwort für den Benutzer
  database: 'demo' // Name der Datenbank
});

/**
 * Stellt die Verbindung zur Datenbank her.
 * - Bei Erfolg wird eine Erfolgsmeldung ausgegeben.
 * - Bei einem Fehler wird eine Fehlermeldung ausgegeben.
 */
db.connect((err) => {
  if (err) {
    // Gibt eine Fehlermeldung aus, falls die Verbindung fehlschlägt.
    return console.error('Verbindung fehlgeschlagen: ' + err.message);
  }
  // Gibt eine Erfolgsmeldung aus, wenn die Verbindung erfolgreich ist.
  console.log('Mit MariaDB verbunden!');
});

/**
 * Beispiel-Daten, die in die Datenbank eingefügt werden sollen.
 * - `username`: Der Benutzername des neuen Benutzers.
 * - `age`: Das Alter des neuen Benutzers.
 */
const username = 'alice'; // Beispiel-Benutzername
const age = 30; // Beispiel-Alter

/**
 * SQL-Abfrage zum Einfügen eines neuen Benutzers in die Tabelle `users`.
 * - Verwendet Platzhalter (`?`) für die Parameter, um SQL-Injection zu vermeiden.
 */
const insertQuery = 'INSERT INTO users (username, age) VALUES (?, ?)';

/**
 * Führt die Einfüge-Abfrage aus.
 * - Übergibt die Werte `username` und `age` als Parameter.
 * - Gibt bei Erfolg die ID des eingefügten Benutzers aus.
 * - Gibt bei einem Fehler eine Fehlermeldung aus.
 */
db.execute(insertQuery, [username, age], (err, result) => {
  if (err) {
    // Gibt eine Fehlermeldung aus, falls die Einfüge-Abfrage fehlschlägt.
    return console.error('Fehler beim Einfügen:', err.message);
  }
  // Gibt die ID des eingefügten Benutzers aus.
  console.log('Benutzer eingefügt mit ID:', result.insertId);

  /**
   * Führt eine Abfrage aus, um alle Benutzer aus der Tabelle `users` abzurufen.
   * - Gibt bei Erfolg die abgerufenen Daten in Tabellenform aus.
   * - Gibt bei einem Fehler eine Fehlermeldung aus.
   */
  db.query('SELECT * FROM users', (err, rows) => {
    if (err) {
      // Gibt eine Fehlermeldung aus, falls die Abfrage fehlschlägt.
      return console.error('Fehler beim Abfragen:', err.message);
    }
    // Gibt alle Benutzer in Tabellenform aus.
    console.log('Alle Benutzer:');
    console.table(rows);

    /**
     * Schließt die Verbindung zur Datenbank, nachdem die Abfrage abgeschlossen ist.
     * - Wichtig, um Ressourcen freizugeben.
     */
    db.end(); 
  });
});