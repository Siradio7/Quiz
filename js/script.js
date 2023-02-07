var bonne_rep = 0; 
var nb_questions = 20;
var nb_erreurs = 0; 
var mem_nb_alea = "";
var jouer = false;

function debuter(){
    // Initialisation d'un nouveau quiz
    if(jouer == false){
        jouer = true;
        bonne_rep = 0; nb_questions = 20;
        nb_erreurs = 0; mem_nb_alea = "";

        init();
        suivant();
        $(".btn").hide();
    }
    else{
        alert("Veuillez terminer la partie lancée s'il vous plaît !");
    }
}


function init(){
    document.getElementById("place_score_reste").innerText = "Score : " + (20-nb_erreurs) + ", Reste : " + nb_questions;
}

function verification(num_rep){
    // On vérifie si le quiz n'est pas lancé
    if(jouer == false)
        return;

    // Vérification s'il s'agit de la bonne reponse sinon réduire le score du joueur
    if(num_rep != bonne_rep){
        nb_erreurs++;
        erreur();
    }
    else{
        bonne_reponse();
    }

    nb_questions--;
    if(nb_questions == 0){
        jouer = false;
        let cible = document.getElementById("fin");
        let cible2 = document.getElementById("text");
        let croix = document.getElementById("croix");
        
        setTimeout(() => {
            $(".affiche").hide("slow");
            $("#place_score_reste").hide("slow");
            $(".btn").show("slow");
            cible.style.display = "flex";
        }, 3000);
        cible2.innerHTML = "Vous avez le terminé le quiz avec un score de " + (20 - nb_erreurs) + "/20" + "<br> Voulez-vous lancer une nouvelle partie ? <br> Fermez la boite de dialogue et cliquez sur le bouton débuter" ;
        croix.addEventListener("click", () => {
            cible.style.display = "none";
        });
    }

    init();
    setTimeout(suivant, 3000);
}

function suivant(){
    var indice = 0; 
    var test = true; 
    var nb_alea = 0;

    if(jouer == false)
        return;

    while(test == true){
        nb_alea = Math.floor(Math.random() * 70) + 1;
        if(mem_nb_alea.indexOf("-" + nb_alea + "-") > -1){
            nb_alea = Math.floor(Math.random() * 70) + 1;
        }
        else{
            mem_nb_alea += "-" + nb_alea + "-";
            test = false;
        }
    }

    var chaine_question = questions(nb_alea);
    var tab_question = chaine_question.split("*");

    document.getElementById("question").innerText = tab_question[0];
    for (indice = 1; indice <= 4; indice++) {
        document.getElementById("reponse" + indice).innerText = tab_question[indice];
    }

    bonne_rep = tab_question[5];
}

/****************************************** Animation de la page ***********************************************/
$(".affiche").hide("fast");
$("#place_score_reste").hide("fast");
$(document).ready(function (){
    $("#button").click(function (){
        $(".affiche").show('fast');
        $("#place_score_reste").show('fast');
    });
});

function erreur() {
    let cible = document.getElementById("mauvaise-reponse");
    cible.style.display = "block";
    var timeline = new TimelineMax();
    timeline.from("#mauvaise-reponse", 1, {top: 50, opacity: 0});
    // Disparition après 3 secondes
    setTimeout(() => {
        cible.style.display = "none";
    }, 3000);
}

function bonne_reponse() {
    let cible = document.getElementById("bonne-reponse");
    cible.style.display = "block";
    var timeline = new TimelineMax();
    timeline.from("#bonne-reponse", 1, {top: 50, opacity: 0});
    // Disparition après 3 secondes
    setTimeout(() => {
        cible.style.display = "none";
    }, 3000);
}

window.onload = () => {
    var timeline = new TimelineMax();
    timeline.from(".baniere_haut", 1, {top: -100, opacity: 0});
    timeline.from(".img-logo", 0.5, {left: -100, opacity: 0});
    timeline.from(".titre", 0.5, {right: -50, opacity: 0});
    timeline.from(".btn", 0.5, {top: -10, opacity: 0});
    timeline.from(".description", 0.5, {top: -20, opacity: 0});
}

/******************************************* Questions du quiz **************************************************/
function questions(numero) {
    var question = "";
    switch (numero) {
        case 1:
            question = "Quel est nombre de bits d'une adresse IPV6 ?*64 bits*48 bits*128 bits*32 bits*3";
            break;
        case 2:
            question = "C'est quoi jQuery ?*Un langage de programmation*Un éditeur de texte*Une librairie*Un logiciel*3";
            break;
        case 3:
            question = "Quels sont les données stockées dans la puce mémoire CMOS ?*Pilotes de périphériques*Paramètres du BIOS*Mots de passe des utilisateurs*Documents de l'utilisateur*2";
            break;
        case 4:
            question = "Quel est nombre de bits d'une adresse IPV4 ?*64 bits*48 bits*128 bits*32 bits*4";
            break;
        case 5:
            question = "Quel protocole vérifie la communication entre deux hôtes sur un réseau ?*ICMP*HTTP*DHCP*FTP*1";
            break;
        case 6:
            question = "Le protocole pour le web est ... *TCP-IP*FTP*HTTP*ICMP*3";
            break;
        case 7:
            question = "Vous souhaitez mettre en ligne un rapport de recherche à la mise en page complexe. Quel format de document permettra au plus grand nombre de personnes de lire et d'imprimer simplement votre document ?*txt*ppt*html*pdf*4";
            break;
        case 8:
            question = "L'outil informatique permettant de rechercher un fichier sur l'ordinateur propose plusieurs critères de rechercher. Lequel de ces critères n'existe pas ?*La taille du fichier*Le type de fichier*Le logiciel qui a servi à créer le fichier*Le nom du fichier*3";
            break;
        case 9:
            question = "Où se trouvent mes nouveaux courriels avant que je démarre mon logiciel de messagerie ?*Sur une machine quelconque de l'internet*Déjà sur ma machine*En attente sur la machine de l'expéditeur*Sur le serveur de ma messagerie*4";
            break;
        case 10:
            question = "Partager un fichier, c'est ...*Rendre un fichier accessible à d'autres utilisateurs sur un réseau privé*Séparer un fichier en deux autres fichiers*Le copier et le donner à un ami*Déplacer le fichier dans un autre espace de stockage*1"
            break;
        case 11:
            question = "Dans une adresse telle que http://www.education.gouv.fr qu'appelle t-on le protocole ?*http*gouv*www*fr*1";
            break;
        case 12:
            question = "A quoi sert le protocole SMTP ?*Il permet, grâce à un logiciel de messagerie, de récupérer les courriels sur mon ordinateur*Il permet de contrôler l'affichage des fenêtres 'pop up'*Il permet d'envoyer des courriels*Il permet l'échange de fichiers de poste à poste*3";
            break;
        case 13:
            question = "Qu'est-ce qu'une URL ?*Une adresse internet*Une extension de fichier*Une adresse de messagerie*Une erreur au niveau d'un routeur*1";
            break;
        case 14:
            question = "Dans la liste suivante quelle est l'extension qui ne concerne pas des fichiers audio ou vidéo ?*.avi*.mp3*.docx*.vob*3";
            break;
        case 15:
            question = "Quel protocole réseau est utilisé pour affecter automatiquement une adresse IP à un ordinateur sur un réseau ?*APIPA*FTP*DHCP*SMTP*3";
            break;
        case 16:
            question = "Quel est le format compressé correct de l’adresse IPv6 2001:0db8:eeff:000a:0000:0000:0000:0001 ?*2001:db8:eeff:a::1*2001:db8:eeff:a:1*2001:db8:eeff:a::0001*2001:db8:eeff:a:::1*1";
            break;
        case 17:
            question = "Quelle est la notation correcte du préfixe CIDR pour le masque de sous-réseau 255.0.0.0 ?*/8*/16*/24*/32*1";
            break;
        case 18:
            question = "Quel serveur réseau ne fonctionne pas correctement si un utilisateur peut envoyer une requête ping à l’adresse IP d’un serveur Web, mais pas au nom d’hôte du serveur Web ?*Serveur DNS*Serveur DHCP*Serveur FTP*Serveur HTTP*1";
            break;
        case 19:
            question = "Quelle méthode de filtrage utilise l’adresse physique pour spécifier exactement le périphérique autorisé ou non à envoyer des données sur un réseau ?*filtrage des adresses MAC*transfert de port*déclenchement de port*création de listes blanches*1";
            break;
        case 20:
            question = "Quel périphérique a pour fonction principale la fourniture d’une connectivité sans fil ?*Commutateur*Routeur*Point d'accès*Modem*3";
            break;
        case 21:
            question = "Quel type de serveur est utilisé pour stocker un historique des messages provenant des périphériques réseau surveillés ?*DHCP*DNS*Syslog*Authentification*3";
            break;
        case 22:
            question = "Quel type de serveur prend en charge les protocoles SMTP, POP et IMAP ?*DHCP*Proxy*E-mail*Syslog*3";
            break;
        case 23:
            question = "Pouvez-vous citer une utilisation courante d’un serveur proxy ?*Enregistrer les pages Web fréquemment consultées sur le réseau interne*Contrôler les personnes autorisées à accéder au réseau interne*Détecter les signatures malveillantes en surveillant le trafic entrant sur le réseau interne*Accéder à un pool partagé de ressources informatiques configurables*1";
            break;
        case 24:
            question = "À combien de périphériques un appareil Bluetooth peut-il se connecter simultanément ?*127*7*10*24*2";
            break;
        case 25:
            question = "Un grand magasin déploie un nouveau mode de paiement qui permet à un client de payer en plaçant un smartphone sur un appareil de détection. Quel service doit être activé sur les smartphones pour prendre en charge cette technologie ?*IR*NFC*Wi-Fi*Bluetooth*2";
            break;
        case 26:
            question = "Le service informatique signale qu'un serveur web d'entreprise reçoit simultanément un nombre anormalement élevé de demandes de pages web provenant de différents emplacements. Quel type d'attaque de sécurité se produit ?*Logiciel publicitaire*DDoS*Spyware*Hameçonnage*2";
            break;
        case 27:
            question = "Quel algorithme est utilisé pour l'encodage par hachage afin de garantir l'intégrité des données ?*MD5*VPN*SSL*Somme de contrôle*1";
            break;
        case 28:
            question = "Quel langage de programmation nécessite que le programme soit converti en code exécutable à l'aide d'un compilateur ?*Python*JavaScript*Java*VBScript*3"
            break;
        case 29:
            question = "Le masque d'un réseau de classe ... est 255.255.0.0*C*A*D*B*4";
            break;
        case 30:
            question = "Quel est le masque d'un réseau de classe A ?*0.0.0.0*255.255.255.0*255.0.0.0*255.255.0.0*3";
            break;
        case 30:
            question = "Lequel n'est pas un SGBDR*Ingres*Informix*DB3*DB2*3";
            break;
        case 31:
            question = "Que signifie SQL :*Structured Query Langage*System Query Langage*Structured Qualified Langage*Structured reQuest Langage*1";
            break;
        case 32:
            question = "Quelle clause ne fait pas partie du LDD en SQL :*DROP*DELETE*CREATE*ALTER*2";
            break;
        case 33:
            question = "Quelles sont les clauses minimum obligatoires d'un ordre SQL ?*SELECT ... FROM ... WHERE*SELECT ... WHERE*SELECT ... FROM*SELECT ... FROM ... ORDER BY*3";
            break;
        case 34:
            question = "En informatique, RAM signifie :*Random Ability Memory*Random Access Memory*Real Access Memory*Random Accessible Memory*2";
            break;
        case 35:
            question = "Un ventirad est :*Un ventilateur*Un radiateur*Un refroidissement à eau*Un ensemble radiateur et ventilateur*4";
            break;
        case 36:
            question = "Quel périphérique externe permet de garder un ordinateur allumé en cas de coupure de courant ?*L'ondulateur*L'ondulationneur*L'onduleur*L'alimentation*3";
            break;
        case 37:
            question = "Que doit contenir le poste de travail pour pouvoir être connecté au réseau ?*Une clé USB*Un routeur*Un modem*Une carte réseau*4";
            break;
        case 38:
            question = "Quel materiel permet de stocker un volume important de données ?*La RAM*Le disque dur*La carte mère*Le processeur*2";
            break;
        case 39:
            question = "Un octet contient :*1 bit*16 bits*8 bits*4 bits*3";
            break;
        case 40:
            question = "Lors du lancement d'un logiciel, celui-ci est chargé dans :*Le disque dur*La RAM*Le processeur*La ROM*2";
            break;
        case 41:
            question = "Un bus de données est :*Bidirectionnel*Multidirectionnel*Circulaire*Unidirectionnel*1";
            break;
        case 42:
            question = "Dans un ordinateur, où est stocké le système d'exploitation ?*Dans la mémoire ROM*Dans le cloud*Dans la mémoire RAM*Dans le disque dur*4";
            break;
        case 43:
            question = "Dans un ordinateur, les fils électriques chargés d'acheminer les données d'un endroit à un autre sont appelés :*Gaine*Bus*Ports*Barrettes*2";
            break;
        case 44:
            question = "Par quelle adresse est identifiée une carte réseau ?*Logique*IP*MAC*DSN*3";
            break;
        case 45:
            question = "Un programme qui convertit un fichier source en langage machine est un :*Compilateur*Débogueur*Interpréteur*Transformateur*1";
            break;
        case 46:
            question = "Comment nomme-t-on la carte principale d'un ordinateur ?*Carte fille*Carte père*Carte fils*Carte mère*4";
            break;
        case 47:
            question = "Quelle commande DOS permet d'obtenir la liste des fichiers d'un répertoire ?*ls*filelist*dir*list*3";
            break;
        case 48:
            question = "Que signifie FAT ?*File Allocation Table*File Activated Task*File Associated Table*File Active Template*1";
            break;
        case 49:
            question = "Un système d'exploitation est : *Une interface entre deux logiciels*Une application de gestion des ressources*Le nom du concepteur de l'ordinateur*Une interface entre le materiel et les logiciels*4";
            break;
        case 50:
            question = "Quelle langue parle un ordinateur ?*Le binaire*Le C*L'hexadécimal*L'assembleur*1";
            break;
        case 51:
            question = "Que signifie NTFS ?*Novell Technology File Secured*New Technology File System*New Transfert File System*New Technical Fill System*2";
            break;
        case 52:
            question = "En quoi consiste la défragmentation d'un disque dur ?*Rassembler les fragements éparpillés des fichiers*Supprimer les partitions*Nettoyer le disque dur*Supprimer les fichiers temporaires*1";
            break;
        case 53:
            question = "Sous Windows, comment s'appelle le programme permettant de lancer l'invite de commande ?*msdos.exe*dos.exe*cmd.exe*commande.exe*3";
            break;
        case 54:
            question = "L'adresse passerelle désigne généralement l'adresse : *Du serveur*Du switch*Du routeur*Du hub*3";
            break;
        case 55:
            question = "Quelle commande Linux permet d'afficher le répertoire courant ?*pwd*ls*mkdir*dir*1";
            break;
        case 56:
            question = "Un switch relie : *Des serveurs*Des imprimantes*Du matériel*Des routeurs*3";
            break;
        case 57:
            question = "Combien de couches possède le modèle OSI ?*9*7*5*11*2";
            break;
        case 58:
            question = "Un réseau privé virtuel (VPN / RPV) repose sur un protocole : *De tunnelisation*De communication*Réseau*De transmission*1";
            break;
        case 59:
            question = "Wi-Fi signifie ?*Without Fidelity*Wire Fidelity*Wireless Fidelity*Wireless Findable*3";
            break;
        case 60:
            question = "En linux, quelle commande permet de lister le contenu du répertoire courant ?*pwd*chmod*ls*cd*3";
            break;
        case 61:
            question = "En linux, quelle commande permet de changer les droits d'accès d'un fichier ou d'un répertoire ?*grep*chmod*lsmod*chown*2";
            break;
        case 62:
            question = "En linux, quelle commande permet d'obtenir la version du système ?*version -s*kernel -r*uname -r*uname -s*3";
            break;
        case 63:
            question = "En linux, quelle commande permet de créer un répertoire ?*ld*createdir*md*mkdir*4";
            break;
        case 64:
            question = "De quel système est issu Linux ?*Ubuntu*Windows*Debian*Unix*4";
            break;
        case 65:
            question = "A quoi sert le compte Root sous linux ?*A accéder à internet*A se connecter en tant qu'invité*A installer le système*A administrer le système*4";
            break;
        case 66:
            question = "Quel symbole indique le répertoire personnel de l'utilisateur ?*~*.*:*#*1";
            break;
        case 67:
            question = "Dans linux, les deux points (..) désigne le dossier :*Parent*Courant*Root*Usr*1";
            break;
        case 68:
            question = "Dans linux, le point (.) désigne le dossier :*Parent*Courant*Root*Usr*2";
            break;
        case 69:
            question = "Quelle commande Linux permet d'obtenir de l'aide sur une commande ?*manual*?*help*man*4";
            break;
        case 70:
            question = "Dans Linux, quel est le répertoire de l'administrateur système ?*/sys*/admsys*/admin*/root*4";
            break;
    }

    return question;
}

setTimeout(() => {
    var typded = new Typed(".titre h3", {
        strings: ["Questionnaire à choix multiples - Cliquez sur la bonne réponse"],
        typeSpeed: 70,
        backSpeed: 70
    })
}, 3000);

