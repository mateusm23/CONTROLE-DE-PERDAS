// Trava de login compartilhada por todas as páginas protegidas.
// Uso: import { exigirLogin, sair } from './js/auth-guard.js';
//      exigirLogin(function(sessao) { ... código da página ... });
import { auth, db } from './firebase-init.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

export function exigirLogin(callback) {
  onAuthStateChanged(auth, async function(user) {
    if (!user) { window.location.href = 'login.html'; return; }
    var snap = await getDoc(doc(db, 'usuarios', user.uid));
    var perfilDoc = snap.exists() ? snap.data() : {};
    callback({
      uid: user.uid,
      nome: perfilDoc.nome || user.email,
      perfil: perfilDoc.perfil || 'usuario',
      email: user.email
    });
  });
}

export function sair() {
  signOut(auth).then(function() { window.location.href = 'login.html'; });
}
