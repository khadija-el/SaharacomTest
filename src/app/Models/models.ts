export class Article {
    id = 0;
    reference = '';
    designation = '';
    stockFinal = '';
    stockInitial = '';
    qteVendue = '';
    qteAcheté = '';
    stockMinimal = '';
    prixAchatHT = '';
    prixAchatTTC = false;
    prixVenteHT = 0;
    prixVenteTTC = 0;
    info='';
    detailLivraisonClients: DetailLivraisonClient[] = [];
 
  }
  export class Client {
    id = 0;
    raisonSocial = '';
    tel = '';
    email = '';
    adresse = '';
    livraisonClients: LivraisonClient[] = [];
   }
   export class LivraisonClient {
    id = 0;
    numero = '';
    dateCreation = new Date();
    info = '';
    montantHT = 0;
    tva = 0;
    montantTTC = 0;
    escompte = 0;
    client: Client;
    idClient = null;
    detailLivraisonClients: DetailLivraisonClient[] = [];
  }
  
  export class DetailLivraisonClient {
    id = 0;
    numero = '';
    qte = 1;
    puvhT_Brut = 0;
    remiseHT = 0;
    montantHT = 0;
    pUVTTC_Brut = 0;
    montantTTC = 0;
    tva = 0;
    livraisonClient: LivraisonClient;
    article: Article;
    idLivraisonClient = null;
    idArticle = null;
  }
  export class Tva {
    id=0;
    code='';
    designation='';
    taux=0
  }
  
  