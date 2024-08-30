const db = require('./db.js');

db.serialize();
db.run("ALTER TABLE Movies ADD COLUMN youtube_url NVARCHAR(255)");
db.close();