// Configuração central do Firebase. Todas as páginas importam este arquivo,
// então a chave só precisa ser colada AQUI, uma vez só.
//
// COMO PREENCHER: Firebase Console → Project settings (ícone de engrenagem)
// → aba "General" → seção "Your apps" → copie os valores do firebaseConfig.
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { initializeFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAqvqGynObZuxoET9-z0mRVjLrNmj7ukfc",
  authDomain: "auditoria-concreto.firebaseapp.com",
  projectId: "auditoria-concreto",
  storageBucket: "auditoria-concreto.firebasestorage.app",
  messagingSenderId: "485119291987",
  appId: "1:485119291987:web:24180047693885c7590ca6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// experimentalForceLongPolling: em redes de empresa (proxy/firewall que
// barra conexões "streaming"), a conexão normal do Firestore fica
// pendurada sem erro nem sucesso. Isso força um jeito de conexão mais
// antigo e compatível com esse tipo de rede (a detecção automática não
// foi suficiente neste caso).
export const db = initializeFirestore(app, { experimentalForceLongPolling: true });
export const storage = getStorage(app);
