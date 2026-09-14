/* =========================================================
   Kibo — Datos simulados y helpers de estado (prototipo)
   Todo se guarda en localStorage. No hay backend real.
   ========================================================= */

const KIBO_KEY = 'kibo_state_v1';

const PSYCHOLOGISTS = [
  { id:1, name:'Dra. M. Herrera', initials:'MH', specialty:'Ansiedad y estrés', gender:'Femenino', languages:['Español','Inglés'], price:18000, rating:4.9, reviews:132, sessions:410, distanceKm:0.8, available:true, verified:true, bio:'Psicóloga clínica con 9 años de experiencia en trastornos de ansiedad y manejo del estrés laboral. Enfoque cognitivo-conductual.', education:'Pontificia Universidad Católica de Chile · Magíster en Psicología Clínica', gradient:'linear-gradient(150deg,#a9d3e0,#6fa8bd)' },
  { id:2, name:'Ps. R. Contreras', initials:'RC', specialty:'Duelo y pérdida', gender:'Masculino', languages:['Español'], price:15000, rating:4.7, reviews:88, sessions:265, distanceKm:1.4, available:true, verified:true, bio:'Especialista en procesos de duelo, pérdida y transiciones vitales. Espacio de escucha cálida y sin juicio.', education:'Universidad de Chile · Especialización en Terapia de Duelo', gradient:'linear-gradient(150deg,#b8c6f0,#8f9fe0)' },
  { id:3, name:'Dra. F. Salinas', initials:'FS', specialty:'Depresión', gender:'Femenino', languages:['Español','Portugués'], price:20000, rating:5.0, reviews:54, sessions:190, distanceKm:2.1, available:false, verified:true, bio:'Enfoque humanista para el acompañamiento de cuadros depresivos leves a moderados y crisis vitales.', education:'Universidad de los Andes · Diplomado en Psicoterapia Humanista', gradient:'linear-gradient(150deg,#f5cba3,#eaa97e)' },
  { id:4, name:'Ps. D. Fuentes', initials:'DF', specialty:'Ansiedad y estrés', gender:'Masculino', languages:['Español','Inglés'], price:16000, rating:4.6, reviews:71, sessions:301, distanceKm:3.6, available:true, verified:true, bio:'Trabajo con jóvenes adultos en ansiedad social, autoestima y manejo de la incertidumbre.', education:'Universidad Diego Portales · Psicólogo Clínico', gradient:'linear-gradient(150deg,#f0c3a3,#d99b7e)' },
  { id:5, name:'Ps. C. Ibáñez', initials:'CI', specialty:'Relaciones de pareja', gender:'No binario', languages:['Español'], price:17000, rating:4.8, reviews:63, sessions:158, distanceKm:5.9, available:true, verified:true, bio:'Terapia de pareja y vínculos, con enfoque sistémico. Espacio seguro para todo tipo de relaciones.', education:'Universidad Alberto Hurtado · Terapia Sistémica', gradient:'linear-gradient(150deg,#d4c3f0,#a8d4e0)' },
  { id:6, name:'Dr. J. Morales', initials:'JM', specialty:'Depresión', gender:'Masculino', languages:['Español'], price:14000, rating:4.5, reviews:44, sessions:120, distanceKm:9.2, available:false, verified:true, bio:'Psicólogo clínico enfocado en primera contención emocional y derivación oportuna.', education:'Universidad de Concepción · Psicólogo Clínico', gradient:'linear-gradient(150deg,#a8d0e8,#b3b8ea)' },
];

function money(n){ return '$' + n.toLocaleString('es-CL'); }

function loadState(){
  try{
    const raw = localStorage.getItem(KIBO_KEY);
    if(raw) return JSON.parse(raw);
  }catch(e){}
  return {
    theme: null,
    lang: 'ES',
    session: null, // { role: 'paciente'|'psicologo'|'admin', name, email }
    patientSessionCount: 3,
    psySessionCount: 410,
    psyStatus: 'disponible',
    incidents: [],
    pendingPsychologists: [
      { id:'p101', name:'Ps. Valentina Rojas', registro:'SIS-88213', specialty:'Ansiedad y estrés', submitted:'2026-09-10' },
      { id:'p102', name:'Ps. Tomás Bravo', registro:'SIS-77410', specialty:'Duelo y pérdida', submitted:'2026-09-12' },
    ],
    activePsychologist: null, // id of psychologist being requested/in session
  };
}

function saveState(state){
  localStorage.setItem(KIBO_KEY, JSON.stringify(state));
}

function updateState(patch){
  const s = loadState();
  const next = Object.assign({}, s, typeof patch === 'function' ? patch(s) : patch);
  saveState(next);
  return next;
}

function addIncident(incident){
  const s = loadState();
  const incidents = s.incidents || [];
  incidents.unshift(Object.assign({
    id: 'INC-' + Math.random().toString(36).slice(2,7).toUpperCase(),
    date: new Date().toISOString(),
    status: 'abierto',
  }, incident));
  updateState({ incidents });
}

function getPsychologist(id){
  return PSYCHOLOGISTS.find(p => String(p.id) === String(id));
}

function avatarHTML(p, size){
  return `<div class="avatar-dot" style="background:${p.gradient}">${p.initials}</div>`;
}

function starsHTML(rating){
  const full = Math.round(rating);
  let out = '';
  for(let i=0;i<5;i++) out += i < full ? '★' : '☆';
  return out;
}
