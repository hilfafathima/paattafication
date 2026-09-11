import { jsPDF } from 'jspdf';
import { CockroachAnalysisResult } from '../../types';

export function generatePDFReport(result: CockroachAnalysisResult) {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;

    const safeSubjectName = (result.subject?.name || 'SUBJECT').toUpperCase();
    const safeStatus = (result.subject?.employmentStatus || result.subject?.status || 'UNEMPLOYED').toUpperCase();
    const safeGeneScore = typeof result.simulatedGeneCompatibility === 'object'
      ? result.simulatedGeneCompatibility?.percentage ?? result.cciScore
      : result.simulatedGeneCompatibility ?? result.cciScore;

    // Helper for background paper fill
    const applyPageBackground = (pageNum: number) => {
      doc.setFillColor(11, 15, 25); // Dark HUD Background
      doc.rect(0, 0, pageWidth, pageHeight, 'F');

      // Page border frame
      doc.setDrawColor(6, 182, 212);
      doc.setLineWidth(0.5);
      doc.rect(margin, margin, pageWidth - margin * 2, pageHeight - margin * 2);

      // Top gradient bar
      doc.setFillColor(6, 182, 212);
      doc.rect(margin, margin, pageWidth - margin * 2, 2, 'F');

      // Footer
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text(`FORM PTF-01 · DEPARTMENT OF UNNECESSARY BIOLOGY · PAGE ${pageNum} OF 4`, margin + 5, pageHeight - margin - 4);
      doc.text(`REPORT: ${result.reportNumber}`, pageWidth - margin - 50, pageHeight - margin - 4);
    };

    // --- PAGE 1: COVER & CENTERPIECE ---
    applyPageBackground(1);

    // Header Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(0, 240, 255);
    doc.text("PAATTAFICATION", margin + 10, 32);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(248, 250, 252);
    doc.text("THE DEPARTMENT OF UNNECESSARY BIOLOGY", margin + 10, 38);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(6, 182, 212);
    doc.text("GOVERNMENT OF KERALA · RESEARCH DIVISION", margin + 10, 43);

    doc.setDrawColor(51, 65, 85);
    doc.line(margin + 10, 46, pageWidth - margin - 10, 46);

    // Metadata Box
    doc.setFillColor(15, 23, 42);
    doc.rect(margin + 10, 52, pageWidth - margin * 2 - 20, 28, 'F');
    doc.setDrawColor(51, 65, 85);
    doc.rect(margin + 10, 52, pageWidth - margin * 2 - 20, 28, 'D');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(203, 213, 225);
    doc.text(`REPORT NO: ${result.reportNumber}`, margin + 15, 60);
    doc.text(`DATE OF ISSUE: ${result.timestamp}`, margin + 15, 66);
    doc.text(`SUBJECT NAME: ${safeSubjectName}`, margin + 95, 60);
    doc.text(`STATUS: ${safeStatus}`, margin + 95, 66);
    doc.text(`CLASSIFICATION: BIOMETRIC TELEMETRY REVIEW`, margin + 15, 72);

    // CENTERPIECE SCORE BOX
    doc.setFillColor(15, 23, 42);
    doc.rect(margin + 20, 88, pageWidth - margin * 2 - 40, 55, 'F');
    doc.setDrawColor(6, 182, 212);
    doc.rect(margin + 20, 88, pageWidth - margin * 2 - 40, 55, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(148, 163, 184);
    doc.text("COCKROACH COMPATIBILITY INDEX (CCI™)", pageWidth / 2, 98, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(42);
    doc.setTextColor(0, 240, 255);
    doc.text(`${result.cciScore}%`, pageWidth / 2, 118, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(255, 46, 77);
    doc.text(`DEPARTMENTAL ASSESSMENT LEVEL: ${result.concernLevel} CONCERN`, pageWidth / 2, 134, { align: 'center' });

    // TAXONOMY BOX
    doc.setFillColor(15, 23, 42);
    doc.rect(margin + 10, 155, pageWidth - margin * 2 - 20, 48, 'F');
    doc.setDrawColor(51, 65, 85);
    doc.rect(margin + 10, 155, pageWidth - margin * 2 - 20, 48, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(0, 240, 255);
    doc.text("UNIQUE FICTIONAL TAXONOMY CLASSIFICATION", margin + 15, 165);

    doc.setFont('times', 'bolditalic');
    doc.setFontSize(13);
    doc.setTextColor(0, 255, 136);
    doc.text(`Latin Name: ${result.taxonomy.fullName}`, margin + 15, 174);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(255, 46, 77);
    doc.text(`Common Name: ${result.taxonomy.commonName}`, margin + 15, 183);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(203, 213, 225);
    doc.text(`Habitat: ${result.taxonomy.habitat}`, margin + 15, 193);

    // Stamp graphic
    doc.setDrawColor(255, 46, 77);
    doc.setLineWidth(0.8);
    doc.rect(margin + 20, 215, 85, 16);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(255, 46, 77);
    doc.text("APPROVED FOR CONTINUED", margin + 24, 222);
    doc.text("HUMAN OPERATION", margin + 24, 227);


    // --- PAGE 2: METRICS & TRAITS ---
    doc.addPage();
    applyPageBackground(2);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(0, 240, 255);
    doc.text("SECTION 1: PHYSICAL & GRAVITATIONAL TELEMETRY", margin + 10, 30);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(248, 250, 252);
    doc.text("A. GRAVITATIONAL ANALYSIS (F = m × g)", margin + 10, 42);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(203, 213, 225);
    doc.text(`Subject Mass: ${result.physics.massKg} kg`, margin + 15, 49);
    doc.text(`Gravitational Acceleration: 9.81 m/s²`, margin + 15, 55);
    doc.text(`Calculated Force: ${result.physics.gravitationalForceN} Newtons`, margin + 15, 61);
    
    const physicsSplit = doc.splitTextToSize(`Interpretation: ${result.physics.interpretation}`, pageWidth - margin * 2 - 30);
    doc.text(physicsSplit, margin + 15, 68);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(248, 250, 252);
    doc.text("B. VERTICAL SPATIAL OCCUPANCY RATIO", margin + 10, 88);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(203, 213, 225);
    doc.text(`Subject Height: ${result.verticalOccupancy.heightCm} cm (Vertical Ratio: ${result.verticalOccupancy.occupancyRatio})`, margin + 15, 95);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(0, 240, 255);
    doc.text("SECTION 2: BIOMETRIC TRAIT PROFILE", margin + 10, 120);

    const traitEntries = [
      { label: 'Environmental Adaptability', val: result.traits.adaptability },
      { label: 'Night Activity Ratio', val: result.traits.nightActivity },
      { label: 'Deadline Stress Resistance', val: result.traits.deadlineResistance },
      { label: 'Survival Instinct', val: result.traits.survivalInstinct },
      { label: 'Resource Opportunism Index', val: result.traits.foodOpportunism },
      { label: 'Environmental Resilience', val: result.traits.environmentalResilience }
    ];

    let currentY = 132;
    traitEntries.forEach((t) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(248, 250, 252);
      doc.text(`${t.label}: ${t.val}%`, margin + 15, currentY);
      
      doc.setFillColor(30, 41, 59);
      doc.rect(margin + 105, currentY - 3, 60, 4, 'F');
      doc.setFillColor(6, 182, 212);
      doc.rect(margin + 105, currentY - 3, (Math.min(100, t.val) / 100) * 60, 4, 'F');
      
      currentY += 10;
    });


    // --- PAGE 3: SIMULATED GENE & OBSERVATIONS ---
    doc.addPage();
    applyPageBackground(3);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(0, 240, 255);
    doc.text("SECTION 3: GENE COMPATIBILITY & OBSERVATIONS", margin + 10, 30);

    doc.setFillColor(15, 23, 42);
    doc.rect(margin + 10, 38, pageWidth - margin * 2 - 20, 32, 'F');
    doc.setDrawColor(51, 65, 85);
    doc.rect(margin + 10, 38, pageWidth - margin * 2 - 20, 32, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(0, 255, 136);
    doc.text(`SIMULATED GENE COMPATIBILITY METRIC: ${safeGeneScore}%`, margin + 15, 48);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    const geneDisc = doc.splitTextToSize("DISCLAIMER: This metric is an entertainment estimate generated by D.U.B. It does NOT represent actual DNA, genetics, mutation, health, or biological similarity to cockroaches.", pageWidth - margin * 2 - 35);
    doc.text(geneDisc, margin + 15, 56);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(0, 240, 255);
    doc.text("SENIOR RESEARCH SPECIALIST OBSERVATIONS", margin + 10, 80);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(203, 213, 225);

    const obsText = result.departmentalObservations || 'Full behavioral observations recorded and logged in official research database.';
    const obsSplit = doc.splitTextToSize(obsText, pageWidth - margin * 2 - 20);
    doc.text(obsSplit, margin + 10, 90);


    // --- PAGE 4: FINAL VERDICT ---
    doc.addPage();
    applyPageBackground(4);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(0, 240, 255);
    doc.text("SECTION 4: FINAL EVALUATION VERDICT", margin + 10, 32);

    doc.setFillColor(15, 23, 42);
    doc.rect(margin + 10, 40, pageWidth - margin * 2 - 20, 50, 'F');
    doc.setDrawColor(255, 46, 77);
    doc.rect(margin + 10, 40, pageWidth - margin * 2 - 20, 50, 'D');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(248, 250, 252);
    const verdictText = result.finalVerdict || 'Subject demonstrates strong environmental resilience and adaptability metrics.';
    const verdictSplit = doc.splitTextToSize(verdictText, pageWidth - margin * 2 - 30);
    doc.text(verdictSplit, margin + 15, 52);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(255, 46, 77);
    doc.text("THE DEPARTMENT HAS NO FURTHER QUESTIONS.", margin + 15, 80);

    // Official Seals
    doc.setDrawColor(6, 182, 212);
    doc.setLineWidth(0.8);
    doc.rect(margin + 15, 105, 85, 20);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(6, 182, 212);
    doc.text("STATE OF KERALA · D.U.B.", margin + 20, 113);
    doc.text("OFFICIAL RESEARCH SEAL 2026", margin + 20, 119);

    doc.setDrawColor(255, 46, 77);
    doc.rect(margin + 110, 105, 65, 20);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(255, 46, 77);
    doc.text("EVALUATION STATUS:", margin + 115, 113);
    doc.text("COMPLETED", margin + 115, 119);

    // Download Action
    doc.save(`PAATTAFICATION_REPORT_${safeSubjectName}_PTF-01.pdf`);
  } catch (err) {
    console.error("Failed to generate PDF:", err);
    alert("Could not generate PDF report. Please check console for details.");
  }
}
