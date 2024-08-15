import jsPDF from 'jspdf';
import { callAddFont } from '../fonts/Vazirmatn-Regular-normal';

jsPDF.API.events.push(['addFonts', callAddFont]);

const generateWarrant = (warrant) => {
    const doc = new jsPDF();

    doc.setFont("Vazirmatn-Regular");
    doc.setFontSize(12);

    doc.text("PUTNI NALOG", 90, 20);
    doc.text("_______________________", 20, 250);
    doc.text("Potpis odgovorne osobe", 20, 260);

    doc.save(`Putni_nalog_${warrant.userName}.pdf`);
};

export default generateWarrant;