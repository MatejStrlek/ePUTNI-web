import jsPDF from 'jspdf';
import { callAddFont } from '../fonts/Vazirmatn-Regular-normal';
import { TimeUtils } from '../utils/TimeUtils';

jsPDF.API.events.push(['addFonts', callAddFont]);

const daysInWords = (days) => {
    const numberToWordMap = {
        1: 'jedan dan',
        2: 'dva dana',
        3: 'tri dana',
        4: 'četiri dana',
        5: 'pet dana',
        6: 'šest dana',
        7: 'sedam dana',
        8: 'osam dana',
        9: 'devet dana',
        10: 'deset dana'
    };

    return numberToWordMap[days] || `${days} dana`;
};

const generateWarrant = (warrant) => {
    const startTime = TimeUtils.millsToReadableDate(warrant.startTime);
    const days = TimeUtils.calculateDays(warrant.startTime, warrant.endTime);
    const daysInWordsText = daysInWords(days);

    const doc = new jsPDF('p', 'mm', 'a4');

    doc.setFont("Vazirmatn-Regular", "normal");

    doc.setFontSize(16);
    doc.text("NALOG ZA SLUŽBENO PUTOVANJE", 60, 25);

    doc.line(20, 45, 80, 45);
    doc.setFontSize(9);
    doc.text("(Naziv pravne ili fizičke osobe)", 26, 50);

    doc.setFontSize(12);
    doc.text("Broj Putnog naloga: ______", 20, 60);
    doc.text("U ______________ , dana _____________ god.", 100, 60);

    doc.setFontSize(12);
    doc.text(`${warrant.userName}`, 85, 86)
    doc.line(45, 87, 155, 87);
    doc.setFontSize(9);
    doc.text("(ime i prezime osobe koja putuje)", 75, 92);

    doc.setFontSize(12);

    doc.text(`Na radnom mjestu: ${warrant.role},`, 20, 105);

    doc.text(`otputovat će dana: ${startTime},`, 20, 115);

    doc.text(`na službeno putovanje u: ${warrant.startCity},`, 20, 125);

    doc.text(`sa zadatkom: ${warrant.description},`, 20, 135, { maxWidth: 170 });

    doc.text(`putovanje može trajati ${days} dan/a, (${daysInWordsText}) slovima`, 20, 165);

    doc.text(`Za prijevoz se može koristiti: ${warrant.vehicleType},`, 20, 180);

    doc.text(`marke: ${warrant.vehicleModel}, registarske oznake: ${warrant.licensePlate}`, 20, 190);

    doc.text("Za ovo službeno putovanje odobrava se isplata predujma putnih troškova", 20, 210);
    doc.text("u svoti od: __________________", 20, 220);

    doc.text("Nakon povratka sa službenog puta u roku od _______ dana treba obaviti obračun", 20, 230);
    doc.text("ovog putovanja i podnijeti pismeno izvješće o obavljenom zadatku.", 20, 240);

    doc.text("M.P.", 70, 260);

    doc.line(130, 260, 180, 260);
    doc.setFontSize(8);
    doc.text("(potpis odgovorne osobe)", 140, 265);

    doc.save(`Putni_nalog_${warrant.userName}.pdf`);
};

export default generateWarrant;