  // Import Firebase
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
  import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
  } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
  import { 
    getFirestore, 
    collection, 
    addDoc 
  } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

  // ⚙️ Config Firebase (copie depuis ta console Firebase)
  const firebaseConfig = {
    apiKey: "AIzaSyA6S2lmIUwKUFptBrJKftVyP_F6j-X2XGM",
    authDomain: "sign-up-vafm.firebaseapp.com",
    projectId: "sign-up-vafm",
    storageBucket: "sign-up-vafm.firebasestorage.app",
    messagingSenderId: "561614233020",
    appId: "1:561614233020:web:4a0c3658e343cb74271fb9"
  };

  // 🚀 Initialisation
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  // 🔑 Inscription
  async function register(email, password, username) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("✅ Inscription réussie :", user.email);

      // Sauvegarde dans Firestore
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: user.email,
        username: username,
        createdAt: new Date()
      });

      // Ajout aussi dans subscribers pour notifications
      await addDoc(collection(db, "subscribers"), {
        email: user.email,
        subscribedAt: new Date()
      });

      alert("Compte créé avec succès !");
    } catch (error) {
      console.error("❌ Erreur :", error.message);
      alert("Erreur : " + error.message);
    }
  }

  // 🔐 Connexion
  async function login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("✅ Connexion réussie :", user.email);
      alert("Bienvenue " + user.email);
    } catch (error) {
      console.error("❌ Erreur :", error.message);
      alert("Erreur : " + error.message);
    }
  }

  // 📰 Publier un article (admin)
  async function publierArticle(titre, url) {
    try {
      await addDoc(collection(db, "articles"), {
        title: titre,
        url: url,
        publishedAt: new Date()
      });
      alert("Article publié !");
    } catch (error) {
      console.error("❌ Erreur publication :", error.message);
    }
  }

  // 👉 Exemple d’utilisation :
  // register("test@test.com", "motdepasse123", "PseudoTest");
  // login("test@test.com", "motdepasse123");
  // publierArticle("Nouveau jeu VAFM", "https://vaevgames.com/article.html");
