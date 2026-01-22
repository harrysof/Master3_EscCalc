
export type Subject = {
  name: string;
  coef: number;
};

export type SemesterData = {
  [key: string]: Subject[];
};

export type Branch = {
  id: string;
  name: string;
  role: string; // New role field
  color: string;
  data: SemesterData;
};

export const BRANCHES: Branch[] = [
  {
    id: "FIN",
    name: "Finance D’Entreprise",
    role: "Financier",
    color: "#FF8C00", // DarkOrange
    data: {
      S1: [
        { name: "Diagnostic Et Évaluation De L’Entreprise", coef: 3 },
        { name: "Économétrie Financière", coef: 3 },
        { name: "Finance Internationale", coef: 3 },
        { name: "Montage Financier", coef: 3 },
        { name: "Planification Financière", coef: 3 },
        { name: "Risque Et Assurances", coef: 3 },
        { name: "Théorie Financière", coef: 3 },
        { name: "Éthique Des Affaires", coef: 1.5 },
        { name: "Jeux Et Simulation", coef: 1.5 },
        { name: "Comptabilité Nationale", coef: 1.5 },
        { name: "Droit Des Sociétés", coef: 1.5 },
        { name: "Entrepreneuriat", coef: 1.5 },
        { name: "Finance Islamique", coef: 1.5 },
      ],
    },
  },
  {
    id: "ACC",
    name: "Comptabilité Et Finance",
    role: "Accountant",
    color: "#6A5ACD", // SlateBlue
    data: {
      S1: [
        { name: "Comptabilité Publique 2", coef: 3 },
        { name: "Diagnostic Et Évaluation De L’Entreprise", coef: 3 },
        { name: "Éthique Des Affaires", coef: 1.5 },
        { name: "Fiscalité Approfondie", coef: 3 },
        { name: "Séminaire De Recherche En Comptabilité Financière", coef: 3 },
        { name: "Reporting Financier", coef: 3 },
        { name: "Théorie Comptable", coef: 1.5 },
        { name: "Jeux Et Simulation", coef: 1.5 },
        { name: "Excel Approfondie", coef: 3 },
        { name: "Entrepreneuriat", coef: 1.5 },
        { name: "Comptabilité Des Groupes", coef: 3 },
        { name: "Comptabilité Des Institutions Financières", coef: 3 },
      ],
    },
  },
  {
    id: "CDG",
    name: "Contrôle De Gestion",
    role: "Controller",
    color: "#20B2AA", // LightSeaGreen
    data: {
      S1: [
        { name: "Comptabilité Des Institutions Financières", coef: 3 },
        { name: "Comptabilité Publique 2", coef: 3 },
        { name: "Diagnostic Et Évaluation De L’Entreprise", coef: 3 },
        { name: "Gouvernance D’Entreprises", coef: 3 },
        { name: "Management Des Projets", coef: 3 },
        { name: "Reporting Financier", coef: 3 },
        { name: "Entrepreneuriat", coef: 1.5 },
        { name: "Jeux Et Simulation", coef: 1.5 },
        { name: "Éthique Des Affaires", coef: 1.5 },
        { name: "Théorie Comptable", coef: 1.5 },
        { name: "Contrôle De Gestion En Contexte Spécifique", coef: 3 },
        { name: "Gestion Des Risques Opérationnels", coef: 3 },
      ],
    },
  },
  {
    id: "MFB",
    name: "MFB",
    role: "Banker",
    color: "#4682B4", // SteelBlue
    data: {
      S1: [
        { name: "Finance Internationale", coef: 3 },
        { name: "Produits Financiers Dérivés", coef: 3 },
        { name: "Réglementation Prudentielle Bancaire", coef: 3 },
        { name: "Risque Et Assurance", coef: 3 },
        { name: "Techniques Actuarielles Et Financières", coef: 3 },
        { name: "Économétrie Financière", coef: 3 },
        { name: "Jeux Et Simulation", coef: 1.5 },
        { name: "Éthiques Des Affaires", coef: 1.5 },
        { name: "Comptabilité Nationale", coef: 1.5 },
        { name: "Entrepreneuriat", coef: 1.5 },
        { name: "Gestion Des Risques Bancaires", coef: 3 },
        { name: "Comptabilité Des Institutions Financières", coef: 3 },
      ],
    },
  },
  {
    id: "MGT",
    name: "Management",
    role: "Manager",
    color: "#32CD32", // LimeGreen
    data: {
      S1: [
        { name: "Audit Et Contrôle Interne", coef: 3 },
        { name: "Entreprenariat", coef: 1.5 },
        { name: "Innovation Et Ville Technologique", coef: 3 },
        { name: "Leadership Et Management Des Équipes", coef: 3 },
        { name: "Management De Connaissances", coef: 3 },
        { name: "Management De La Qualité", coef: 3 },
        { name: "Management De Projet", coef: 3 },
        { name: "Analyse Des Données", coef: 3 },
        { name: "Jeux Et Simulation", coef: 1.5 },
        { name: "Éthiques Des Affaires", coef: 1.5 },
        { name: "Compétitivité Et Performance Des Petites Et Moyennes Entreprises", coef: 3 },
        { name: "Droit Du Travail", coef: 1.5 },
      ],
    },
  },
  {
    id: "MKT",
    name: "Marketing",
    role: "Marketer",
    color: "#FF69B4", // HotPink
    data: {
      S1: [
        { name: "CRM", coef: 3 },
        { name: "Sponsorship & Philanthropy", coef: 3 },
        { name: "Seminar In Communication", coef: 1.5 },
        { name: "Semiotics And Advertising", coef: 1.5 },
        { name: "Sales Promotion Techniques", coef: 3 },
        { name: "Selling & Negotiation Techniques", coef: 3 },
        { name: "Marketing Trends", coef: 3 },
        { name: "Data Analysis", coef: 3 },
        { name: "Business Games & Simulation", coef: 1.5 },
        { name: "Websites Design", coef: 3 },
        { name: "Ethics Of Business", coef: 1.5 },
        { name: "Entrepreneurship", coef: 1.5 },
        { name: "B-To-B Marketing", coef: 1.5 },
      ],
    },
  },
];
