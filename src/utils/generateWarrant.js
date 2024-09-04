import jsPDF from 'jspdf';
import { callAddFont } from '../fonts/Vazirmatn-Regular-normal';

jsPDF.API.events.push(['addFonts', callAddFont]);

const generateWarrant = (warrant) => {
    const doc = new jsPDF('p', 'mm', 'a4');

    doc.setFont("Vazirmatn-Regular");

    doc.setFontSize(16);
    doc.text("NALOG ZA SLUŽBENO PUTOVANJE", 65, 25);

    doc.text("_______________________", 20, 45);
    doc.setFontSize(9);
    doc.text("(Naziv pravne ili fizičke osobe)", 26, 50);

    doc.setFontSize(12);
    doc.text("Broj Putnog naloga: ______", 20, 60);
    doc.text("U ______________ , dana _____________ god.", 100, 60);

    doc.setFontSize(12);
    doc.line(45, 87, 150, 87);
    doc.setFontSize(9);
    doc.text("(ime i prezime osobe koja putuje)", 75, 92);

    doc.setFontSize(12);
    doc.text("Na radnom mjestu: _________________________________________________________________", 20, 105);

    doc.text("otputovat će dana: ____________________ ,", 20, 115);

    doc.text("na službeno putovanje u: __________________________________________________", 20, 125);

    doc.text("sa zadatkom: _______________________________________________________________________", 20, 135);

    doc.text("putovanje može trajati ______ dana (_______________) slovima", 20, 145);

    doc.text("Za prijevoz se može koristiti: _________________________________________", 20, 170);

    doc.text("marke: ___________________ , registarske oznake: ________________________", 20, 180);

    doc.text("Za ovo službeno putovanje odobrava se isplata predujma putnih troškova", 20, 210);
    doc.text("u svoti od: _____________", 20, 220);

    doc.text("Nakon povratka sa službenog puta u roku od _______ dana treba obaviti obračun", 20, 230);
    doc.text("ovog putovanja i podnijeti pismeno izvješće o obavljenom zadatku.", 20, 240);

    doc.text("M.P.", 70, 260);

    doc.line(130, 260, 180, 260);
    doc.setFontSize(8);
    doc.text("(potpis odgovorne osobe)", 140, 265);

    doc.save(`Putni_nalog_${warrant.userName}.pdf`);
};

export default generateWarrant;