const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // תוודא שהקובץ הזה קיים ותקין
const fs = require('fs');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// טעינת קובץ הפרקים
const rawData = fs.readFileSync('genesis_chapters.json');
const chapters = JSON.parse(rawData);

async function uploadChapters() {
  const batch = db.batch();
  
  // חשוב: כאן אנחנו מגדירים לאיזה ספר אנחנו מעלים את הפרקים
  // אם שמרת את הספר בשם "ספר בראשית" (בדיוק), אז זה יעבוד.
  // אם שמרת אותו באנגלית, תשנה את המחרוזת למטה.
  const bookName = "ספר בראשית"; 
  
  console.log(`Starting upload of ${chapters.length} chapters to book: ${bookName}...`);

  chapters.forEach((chapter) => {
    // הנתיב: books -> ספר בראשית -> chapters -> מספר הפרק
    // אני משתמש ב-ID (מספר הפרק) כשם המסמך כדי שיהיה קל לשלוף
    const docRef = db.collection('books').doc(bookName).collection('chapters').doc(chapter.id);
    
    // הוספת שדות נוספים לדירוג עתידי
    const chapterData = {
        ...chapter,
        ratingSum: 0,   // סכום הדירוגים
        ratingCount: 0  // מספר המדרגים
    };

    batch.set(docRef, chapterData);
  });

  try {
    await batch.commit();
    console.log('✅ Success! All chapters uploaded.');
  } catch (error) {
    console.error('❌ Error uploading chapters:', error);
  }
}

uploadChapters();