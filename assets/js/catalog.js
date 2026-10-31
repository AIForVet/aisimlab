// The five simulations of AISim Lab: engine, URL options, embed attributes, explanation and challenges.
// Challenge thresholds were measured on the engines (random datasets included), so every challenge can be solved.
// Texts: en, sr (Serbian Latin), sk (Slovak), pt (European Portuguese); a missing language falls back to English.

const f1 = (m) => 2 * m.precision * m.recall / ((m.precision + m.recall) || 1);

export const SIMS = [
    {
        id: 'gradient-descent',
        file: 'gradient_descent.js',
        cls: 'GradientDescentSim',
        icon: '📉',
        level: 1,
        title: {en: 'Gradient Descent', sr: 'Gradijentni spust', sk: 'Gradientný zostup', pt: 'Descida do gradiente'},
        summary: {
            en: 'How a model learns step by step: learning rate, convergence, divergence and local minima.',
            sr: 'Kako model uči korak po korak: stopa učenja, konvergencija, divergencija i lokalni minimumi.',
            sk: 'Ako sa model učí krok za krokom: rýchlosť učenia, konvergencia, divergencia a lokálne minimá.',
            pt: 'Como um modelo aprende passo a passo: taxa de aprendizagem, convergência, divergência e mínimos locais.',
        },
        about: {
            en: [
                'Training a model means finding the weight w for which the cost J(w) is lowest. Gradient descent starts somewhere (w₀) and repeatedly takes a step against the slope of the curve.',
                'The learning rate α sets the step size. Too small and learning is slow; too large and the steps overshoot the minimum and the cost explodes (divergence).',
                'On a non-convex curve there are several valleys. Where you start decides which minimum you end in: a local one, or the global one.',
            ],
            sr: [
                'Treniranje modela znači pronaći težinu w za koju je trošak J(w) najmanji. Gradijentni spust kreće iz neke tačke (w₀) i ponavlja korak suprotno od nagiba krive.',
                'Stopa učenja α određuje veličinu koraka. Premala – učenje je sporo; prevelika – koraci preskaču minimum i trošak eksplodira (divergencija).',
                'Na nekonveksnoj krivoj postoji više dolina. Od početne tačke zavisi u kom minimumu ćete završiti: lokalnom ili globalnom.',
            ],
            sk: [
                'Trénovať model znamená nájsť váhu w, pri ktorej je chyba J(w) najmenšia. Gradientný zostup začne v nejakom bode (w₀) a opakovane robí krok proti sklonu krivky.',
                'Rýchlosť učenia α určuje veľkosť kroku. Príliš malá – učenie je pomalé; príliš veľká – kroky preskočia minimum a chyba prudko rastie (divergencia).',
                'Nekonvexná krivka má viac údolí. Od začiatočného bodu závisí, v ktorom minime skončíte: v lokálnom alebo v globálnom.',
            ],
            pt: [
                'Treinar um modelo significa encontrar o peso w para o qual o custo J(w) é mínimo. A descida do gradiente parte de um ponto (w₀) e dá passos repetidos no sentido contrário ao declive da curva.',
                'A taxa de aprendizagem α define o tamanho do passo. Demasiado pequena – a aprendizagem é lenta; demasiado grande – os passos ultrapassam o mínimo e o custo dispara (divergência).',
                'Numa curva não convexa há vários vales. O ponto de partida decide em que mínimo termina: num mínimo local ou no mínimo global.',
            ],
        },
        options: {profile: 'convex', lr: '', w0: ''},
        state: (s) => ({profile: s.selectedProfileKey, lr: s.alpha, w0: s.w0}),
        challenges: [
            {
                setup: {profile: 'convex', lr: 0.15, w0: -0.5},
                text: {
                    en: 'Reach the minimum (J(w) ≤ 1.01) in at most 20 steps.',
                    sr: 'Stignite do minimuma (J(w) ≤ 1.01) za najviše 20 koraka.',
                    sk: 'Dosiahnite minimum (J(w) ≤ 1.01) najviac za 20 krokov.',
                    pt: 'Chegue ao mínimo (J(w) ≤ 1.01) em no máximo 20 passos.',
                },
                check: (p, m) => p.steps > 0 && p.steps <= 20 && m.loss <= 1.01,
            },
            {
                setup: {profile: 'convex', lr: 0.15, w0: -0.5},
                text: {
                    en: 'Find a learning rate at which training diverges (J(w) > 50).',
                    sr: 'Pronađite stopu učenja pri kojoj trening divergira (J(w) > 50).',
                    sk: 'Nájdite rýchlosť učenia, pri ktorej trénovanie diverguje (J(w) > 50).',
                    pt: 'Encontre uma taxa de aprendizagem com a qual o treino diverge (J(w) > 50).',
                },
                check: (p, m) => !(m.loss <= 50),
            },
            {
                setup: {profile: 'nonconvex', lr: 0.08, w0: -2.2},
                text: {
                    en: 'Non-convex curve: escape the local minimum and reach the global one (J(w) ≤ 1.0).',
                    sr: 'Nekonveksna kriva: izbegnite lokalni minimum i stignite do globalnog (J(w) ≤ 1.0).',
                    sk: 'Nekonvexná krivka: vyhnite sa lokálnemu minimu a dosiahnite globálne (J(w) ≤ 1.0).',
                    pt: 'Curva não convexa: escape ao mínimo local e chegue ao mínimo global (J(w) ≤ 1.0).',
                },
                check: (p, m) => m.loss <= 1.0,
            },
        ],
    },
    {
        id: 'confusion-matrix',
        file: 'confusion_matrix.js',
        cls: 'ConfusionMatrixSim',
        icon: '🎯',
        level: 1,
        title: {
            en: 'Confusion Matrix & Threshold',
            sr: 'Matrica konfuzije i prag odluke',
            sk: 'Matica zámen a rozhodovací prah',
            pt: 'Matriz de confusão e limiar de decisão',
        },
        summary: {
            en: 'Precision, recall and F1: why the decision threshold depends on the cost of each mistake.',
            sr: 'Preciznost, odziv i F1: zašto prag odluke zavisi od cene svake greške.',
            sk: 'Presnosť, úplnosť a F1: prečo rozhodovací prah závisí od ceny každej chyby.',
            pt: 'Precisão, sensibilidade e F1: porque é que o limiar de decisão depende do custo de cada erro.',
        },
        about: {
            en: [
                'A classifier gives each case a probability; the threshold θ turns it into a yes/no decision. Every threshold gives a different confusion matrix (TP, FP, TN, FN).',
                'Precision asks “of everything flagged, how much was right?”; recall asks “of everything real, how much did we catch?”. Moving θ trades one for the other.',
                'Which mistake is worse depends on the job: a missed patient (FN) in medical screening, or a blocked legitimate e-mail (FP) in a spam filter.',
            ],
            sr: [
                'Klasifikator svakom slučaju daje verovatnoću, a prag θ je pretvara u odluku da/ne. Svaki prag daje drugačiju matricu konfuzije (TP, FP, TN, FN).',
                'Preciznost pita „od svega što smo označili, koliko je tačno?“, a odziv „od svega stvarnog, koliko smo uhvatili?“. Pomeranjem θ jedno dobijamo na račun drugog.',
                'Koja greška je gora zavisi od posla: propušten pacijent (FN) u medicinskom skriningu ili blokirana ispravna poruka (FP) u spam filteru.',
            ],
            sk: [
                'Klasifikátor dá každému prípadu pravdepodobnosť a prah θ ju zmení na rozhodnutie áno/nie. Každý prah dáva inú maticu zámen (TP, FP, TN, FN).',
                'Presnosť sa pýta „z toho, čo sme označili, koľko bolo správne?“, úplnosť „z toho, čo naozaj existuje, koľko sme zachytili?“. Posúvaním θ získame jedno na úkor druhého.',
                'Ktorá chyba je horšia, závisí od úlohy: prehliadnutý pacient (FN) pri lekárskom skríningu alebo zablokovaný správny e-mail (FP) v spamovom filtri.',
            ],
            pt: [
                'Um classificador atribui a cada caso uma probabilidade; o limiar θ transforma-a numa decisão sim/não. Cada limiar dá uma matriz de confusão diferente (TP, FP, TN, FN).',
                'A precisão pergunta “de tudo o que assinalámos, quanto estava certo?”; a sensibilidade pergunta “de tudo o que é real, quanto apanhámos?”. Mover θ ganha uma à custa da outra.',
                'O erro mais grave depende da tarefa: um doente não detetado (FN) num rastreio médico ou um e-mail legítimo bloqueado (FP) num filtro de spam.',
            ],
        },
        options: {scenario: 'quality', threshold: 0.5},
        state: (s) => ({scenario: s.scenarioKey, threshold: s.threshold}),
        challenges: [
            {
                setup: {scenario: 'quality', threshold: 0.3},
                text: {
                    en: 'Quality control: set the threshold so that F1 ≥ 0.80.',
                    sr: 'Kontrola kvaliteta: podesite prag tako da F1 ≥ 0.80.',
                    sk: 'Kontrola kvality: nastavte prah tak, aby F1 ≥ 0.80.',
                    pt: 'Controlo de qualidade: ajuste o limiar para que F1 ≥ 0.80.',
                },
                check: (p, m) => f1(m) >= 0.80,
            },
            {
                setup: {scenario: 'medical', threshold: 0.5},
                text: {
                    en: 'Medical screening: miss almost no patient (recall ≥ 0.95) while keeping precision ≥ 0.50.',
                    sr: 'Medicinski skrining: ne propustite gotovo nijednog pacijenta (odziv ≥ 0.95) uz preciznost ≥ 0.50.',
                    sk: 'Lekársky skríning: neprehliadnite takmer žiadneho pacienta (úplnosť ≥ 0.95) pri presnosti ≥ 0.50.',
                    pt: 'Rastreio médico: não deixe escapar quase nenhum doente (sensibilidade ≥ 0.95), mantendo a precisão ≥ 0.50.',
                },
                check: (p, m) => m.recall >= 0.95 && m.precision >= 0.50,
            },
            {
                setup: {scenario: 'spam', threshold: 0.5},
                text: {
                    en: 'Spam filter: almost never block a legitimate message (precision ≥ 0.95) and still catch recall ≥ 0.40.',
                    sr: 'Spam filter: gotovo nikad ne blokirajte ispravnu poruku (preciznost ≥ 0.95), a ipak uhvatite odziv ≥ 0.40.',
                    sk: 'Spamový filter: takmer nikdy nezablokujte správnu správu (presnosť ≥ 0.95) a aj tak zachyťte úplnosť ≥ 0.40.',
                    pt: 'Filtro de spam: quase nunca bloqueie uma mensagem legítima (precisão ≥ 0.95) e mesmo assim apanhe sensibilidade ≥ 0.40.',
                },
                check: (p, m) => m.precision >= 0.95 && m.recall >= 0.40,
            },
        ],
    },
    {
        id: 'regression',
        file: 'regression.js',
        cls: 'RegressionSim',
        icon: '📈',
        level: 2,
        title: {
            en: 'Polynomial Regression & Overfitting',
            sr: 'Polinomska regresija i preprilagođavanje',
            sk: 'Polynomiálna regresia a preučenie',
            pt: 'Regressão polinomial e sobreajuste',
        },
        summary: {
            en: 'Underfitting, overfitting and regularization: why a perfect fit on training data is a warning sign.',
            sr: 'Potprilagođavanje, preprilagođavanje i regularizacija: zašto savršeno slaganje sa podacima za učenje nije dobar znak.',
            sk: 'Nedoučenie, preučenie a regularizácia: prečo dokonalá zhoda s trénovacími dátami je varovný signál.',
            pt: 'Subajuste, sobreajuste e regularização: porque é que um ajuste perfeito aos dados de treino é um sinal de alerta.',
        },
        about: {
            en: [
                'The model is a polynomial of degree d. A low degree cannot follow the data (underfitting); a high degree follows every noisy point (overfitting).',
                'The training error always falls as d grows. What matters is the error on validation data the model has not seen – it falls, then rises again.',
                'Regularization λ penalizes large coefficients and calms a high-degree polynomial down, so it generalizes better.',
            ],
            sr: [
                'Model je polinom stepena d. Nizak stepen ne može da prati podatke (potprilagođavanje), a visok prati svaku šumnu tačku (preprilagođavanje).',
                'Greška na podacima za učenje uvek opada kako d raste. Važna je greška na validacionim podacima koje model nije video – ona prvo opada, pa ponovo raste.',
                'Regularizacija λ kažnjava velike koeficijente i smiruje polinom visokog stepena, pa on bolje generalizuje.',
            ],
            sk: [
                'Model je polynóm stupňa d. Nízky stupeň nedokáže sledovať dáta (nedoučenie), vysoký sleduje každý zašumený bod (preučenie).',
                'Chyba na trénovacích dátach s rastúcim d vždy klesá. Dôležitá je chyba na validačných dátach, ktoré model nevidel – najprv klesá, potom znova rastie.',
                'Regularizácia λ penalizuje veľké koeficienty a upokojí polynóm vysokého stupňa, takže lepšie zovšeobecňuje.',
            ],
            pt: [
                'O modelo é um polinómio de grau d. Um grau baixo não acompanha os dados (subajuste); um grau alto segue cada ponto com ruído (sobreajuste).',
                'O erro de treino desce sempre à medida que d aumenta. O que importa é o erro nos dados de validação que o modelo não viu – desce e depois volta a subir.',
                'A regularização λ penaliza coeficientes grandes e acalma um polinómio de grau alto, que assim generaliza melhor.',
            ],
        },
        options: {dataset: 'sine', degree: 3, lambda: 0},
        state: (s) => ({dataset: s.datasetKey, degree: s.degree, lambda: s.lambda}),
        challenges: [
            {
                setup: {dataset: 'sine', degree: 1, lambda: 0},
                text: {
                    en: 'Sine data: find a degree with validation MSE < 0.20.',
                    sr: 'Sinusni podaci: pronađite stepen sa validacionom greškom MSE < 0.20.',
                    sk: 'Sínusové dáta: nájdite stupeň s validačnou chybou MSE < 0.20.',
                    pt: 'Dados sinusoidais: encontre um grau com erro de validação MSE < 0.20.',
                },
                check: (p, m) => m.valMse < 0.20,
            },
            {
                setup: {dataset: 'sine', degree: 3, lambda: 0},
                text: {
                    en: 'Show overfitting: training MSE < 0.01 while validation MSE > 0.20.',
                    sr: 'Pokažite preprilagođavanje: greška učenja MSE < 0.01, a validaciona MSE > 0.20.',
                    sk: 'Ukážte preučenie: trénovacia chyba MSE < 0.01 a validačná MSE > 0.20.',
                    pt: 'Mostre o sobreajuste: erro de treino MSE < 0.01 e erro de validação MSE > 0.20.',
                },
                check: (p, m) => m.trainMse < 0.01 && m.valMse > 0.20,
            },
            {
                setup: {dataset: 'quadratic', degree: 9, lambda: 0},
                text: {
                    en: 'Keep degree 9, but use regularization λ to get validation MSE < 0.14.',
                    sr: 'Zadržite stepen 9, ali regularizacijom λ spustite validacionu grešku MSE ispod 0.14.',
                    sk: 'Ponechajte stupeň 9, ale regularizáciou λ znížte validačnú chybu MSE pod 0.14.',
                    pt: 'Mantenha o grau 9, mas use a regularização λ para obter erro de validação MSE < 0.14.',
                },
                check: (p, m) => p.degree === 9 && m.valMse < 0.14,
            },
        ],
    },
    {
        id: 'knn-tree',
        file: 'knn_tree.js',
        cls: 'KnnTreeSim',
        icon: '🌲',
        level: 2,
        title: {
            en: 'Decision Boundaries: k-NN & Decision Tree',
            sr: 'Granice odlučivanja: k-NN i stablo odlučivanja',
            sk: 'Rozhodovacie hranice: k-NN a rozhodovací strom',
            pt: 'Fronteiras de decisão: k-NN e árvore de decisão',
        },
        summary: {
            en: 'Two ways to split the plane: smooth neighbourhoods (k-NN) or straight cuts (decision tree).',
            sr: 'Dva načina da se podeli ravan: glatka susedstva (k-NN) ili pravi rezovi (stablo odlučivanja).',
            sk: 'Dva spôsoby, ako rozdeliť rovinu: hladké susedstvá (k-NN) alebo rovné rezy (rozhodovací strom).',
            pt: 'Duas formas de dividir o plano: vizinhanças suaves (k-NN) ou cortes retos (árvore de decisão).',
        },
        about: {
            en: [
                'k-NN classifies a point by a vote of its k nearest neighbours. Small k gives a jagged boundary that reacts to every point; large k gives a smooth one.',
                'A decision tree asks yes/no questions about one feature at a time, so its boundaries are straight, axis-aligned cuts. Depth limits how many questions it may ask.',
                'Try both models on the same data and compare the shapes of their boundaries.',
            ],
            sr: [
                'k-NN klasifikuje tačku glasanjem njenih k najbližih suseda. Malo k daje nazubljenu granicu koja reaguje na svaku tačku, a veliko k glatku.',
                'Stablo odlučivanja postavlja da/ne pitanja o jednoj osobini u isto vreme, pa su njegove granice pravi rezovi paralelni osama. Dubina ograničava broj pitanja.',
                'Isprobajte oba modela na istim podacima i uporedite oblike granica.',
            ],
            sk: [
                'k-NN klasifikuje bod hlasovaním jeho k najbližších susedov. Malé k dáva zubatú hranicu, ktorá reaguje na každý bod, veľké k hladkú.',
                'Rozhodovací strom kladie otázky áno/nie vždy o jednej vlastnosti, preto sú jeho hranice rovné rezy rovnobežné s osami. Hĺbka obmedzuje počet otázok.',
                'Vyskúšajte oba modely na rovnakých dátach a porovnajte tvary ich hraníc.',
            ],
            pt: [
                'O k-NN classifica um ponto pelo voto dos seus k vizinhos mais próximos. Um k pequeno dá uma fronteira irregular que reage a cada ponto; um k grande dá uma fronteira suave.',
                'Uma árvore de decisão faz perguntas sim/não sobre uma característica de cada vez, por isso as suas fronteiras são cortes retos paralelos aos eixos. A profundidade limita o número de perguntas.',
                'Experimente os dois modelos com os mesmos dados e compare a forma das fronteiras.',
            ],
        },
        options: {model: 'knn', dataset: 'moons', k: 3, depth: 3},
        state: (s) => ({model: s.modelType, dataset: s.datasetKey, k: s.k, depth: s.maxDepth}),
        embedType: (st) => (st.model === 'tree' ? 'decision-tree' : 'knn-tree'),
        challenges: [
            {
                setup: {model: 'tree', dataset: 'moons', k: 3, depth: 1},
                text: {
                    en: 'Two moons with a decision tree: reach accuracy ≥ 95%.',
                    sr: 'Dva polumeseca sa stablom odlučivanja: dostignite tačnost ≥ 95%.',
                    sk: 'Dva polmesiace s rozhodovacím stromom: dosiahnite presnosť klasifikácie ≥ 95 %.',
                    pt: 'Duas luas com uma árvore de decisão: atinja uma exatidão ≥ 95%.',
                },
                check: (p, m) => p.model === 'tree' && m.testAcc >= 0.95,
            },
            {
                setup: {model: 'tree', dataset: 'circles', k: 3, depth: 1},
                text: {
                    en: 'Circles with a tree of depth at most 3: reach accuracy ≥ 90%.',
                    sr: 'Krugovi sa stablom dubine najviše 3: dostignite tačnost ≥ 90%.',
                    sk: 'Kruhy so stromom hĺbky najviac 3: dosiahnite presnosť klasifikácie ≥ 90 %.',
                    pt: 'Círculos com uma árvore de profundidade máxima 3: atinja uma exatidão ≥ 90%.',
                },
                check: (p, m) => p.model === 'tree' && p.depth <= 3 && m.testAcc >= 0.90,
            },
            {
                setup: {model: 'knn', dataset: 'moons', k: 1, depth: 3},
                text: {
                    en: 'Two moons with k-NN: use k ≥ 7 for a smooth boundary and keep accuracy ≥ 95%.',
                    sr: 'Dva polumeseca sa k-NN: uzmite k ≥ 7 za glatku granicu i zadržite tačnost ≥ 95%.',
                    sk: 'Dva polmesiace s k-NN: použite k ≥ 7 pre hladkú hranicu a udržte presnosť klasifikácie ≥ 95 %.',
                    pt: 'Duas luas com k-NN: use k ≥ 7 para uma fronteira suave e mantenha a exatidão ≥ 95%.',
                },
                check: (p, m) => p.model === 'knn' && p.k >= 7 && m.testAcc >= 0.95,
            },
        ],
    },
    {
        id: 'kmeans',
        file: 'kmeans.js',
        cls: 'KMeansSim',
        icon: '🫧',
        level: 3,
        title: {en: 'K-Means Clustering', sr: 'Klasterovanje K-Means', sk: 'Zhlukovanie K-Means', pt: 'Agrupamento K-Means'},
        summary: {
            en: 'Unsupervised learning: group points without labels, choose K with the elbow method.',
            sr: 'Učenje bez nadzora: grupisanje tačaka bez oznaka i izbor K metodom lakta.',
            sk: 'Učenie bez učiteľa: zoskupovanie bodov bez označení a voľba K metódou lakťa.',
            pt: 'Aprendizagem não supervisionada: agrupar pontos sem rótulos e escolher K com o método do cotovelo.',
        },
        about: {
            en: [
                'K-Means alternates two steps: assign every point to the nearest centroid, then move each centroid to the mean of its points. It stops when nothing changes (convergence).',
                'WCSS (inertia) measures how tight the clusters are. It always falls as K grows, so the best K is where the curve bends – the elbow.',
                'The result depends on where the centroids start: a bad start can get stuck in a poor solution. Re-seed and try again.',
            ],
            sr: [
                'K-Means smenjuje dva koraka: svaku tačku dodeli najbližem centroidu, pa pomeri svaki centroid u sredinu njegovih tačaka. Staje kad se ništa ne menja (konvergencija).',
                'WCSS (inercija) meri koliko su klasteri zbijeni. Uvek opada kako K raste, pa je najbolje K tamo gde se kriva savija – lakat.',
                'Rezultat zavisi od početnih centroida: loš početak može da zaglavi u lošem rešenju. Ponovo postavite centroide i pokušajte opet.',
            ],
            sk: [
                'K-Means strieda dva kroky: každý bod priradí najbližšiemu centroidu a potom posunie každý centroid do stredu jeho bodov. Skončí, keď sa už nič nemení (konvergencia).',
                'WCSS (inercia) meria, aké kompaktné sú zhluky. S rastúcim K vždy klesá, preto je najlepšie K tam, kde sa krivka zalomí – v lakti.',
                'Výsledok závisí od začiatočných centroidov: zlý začiatok môže uviaznuť v zlom riešení. Rozmiestnite centroidy znova a skúste to ešte raz.',
            ],
            pt: [
                'O K-Means alterna dois passos: atribui cada ponto ao centroide mais próximo e depois move cada centroide para a média dos seus pontos. Para quando nada muda (convergência).',
                'A WCSS (inércia) mede quão compactos são os grupos. Desce sempre à medida que K aumenta, por isso o melhor K está onde a curva dobra – o cotovelo.',
                'O resultado depende de onde os centroides começam: um mau início pode ficar preso numa solução fraca. Reposicione os centroides e tente de novo.',
            ],
        },
        options: {dataset: 'blobs3', k: 3},
        state: (s) => ({dataset: s.datasetKey, k: s.k}),
        challenges: [
            {
                setup: {dataset: 'blobs3', k: 2},
                text: {
                    en: 'Three groups: choose the right K and run to convergence with WCSS ≤ 10.',
                    sr: 'Tri grupe: izaberite pravo K i pokrenite do konvergencije sa WCSS ≤ 10.',
                    sk: 'Tri skupiny: zvoľte správne K a spustite až do konvergencie s WCSS ≤ 10.',
                    pt: 'Três grupos: escolha o K certo e execute até à convergência com WCSS ≤ 10.',
                },
                check: (p, m) => m.converged && m.wcss <= 10,
            },
            {
                setup: {dataset: 'blobs4', k: 4},
                text: {
                    en: 'Four groups with K = 4: reach WCSS ≤ 10 (if it gets stuck, re-seed the centroids).',
                    sr: 'Četiri grupe sa K = 4: dostignite WCSS ≤ 10 (ako zaglavi, ponovo postavite centroide).',
                    sk: 'Štyri skupiny s K = 4: dosiahnite WCSS ≤ 10 (ak to uviazne, rozmiestnite centroidy znova).',
                    pt: 'Quatro grupos com K = 4: atinja WCSS ≤ 10 (se ficar preso, reposicione os centroides).',
                },
                check: (p, m) => p.k === 4 && m.converged && m.wcss <= 10,
            },
            {
                setup: {dataset: 'blobs3', k: 3},
                text: {
                    en: 'Show why WCSS alone cannot choose K: on three groups get WCSS < 7.',
                    sr: 'Pokažite zašto sam WCSS ne može da izabere K: na tri grupe dobijte WCSS < 7.',
                    sk: 'Ukážte, prečo samotné WCSS nemôže určiť K: na troch skupinách dosiahnite WCSS < 7.',
                    pt: 'Mostre porque é que a WCSS sozinha não escolhe K: em três grupos obtenha WCSS < 7.',
                },
                check: (p, m) => m.converged && m.wcss < 7,
            },
        ],
    },
    {
        id: 'neural-network',
        file: 'neural_network.js',
        cls: 'NeuralNetworkSim',
        icon: '🧠',
        level: 3,
        title: {
            en: 'Perceptron & Neural Network',
            sr: 'Perceptron i neuronska mreža',
            sk: 'Perceptrón a neurónová sieť',
            pt: 'Perceptrão e rede neuronal',
        },
        summary: {
            en: 'Why one neuron can only draw a straight line, and how a hidden layer learns XOR and circles.',
            sr: 'Zašto jedan neuron može da povuče samo pravu liniju i kako skriveni sloj nauči XOR i krugove.',
            sk: 'Prečo jeden neurón dokáže nakresliť len priamku a ako sa skrytá vrstva naučí XOR a kruhy.',
            pt: 'Porque é que um neurónio só traça uma linha reta e como uma camada oculta aprende o XOR e círculos.',
        },
        about: {
            en: [
                'A perceptron adds up its weighted inputs and decides by the sign: its decision boundary is always a straight line. It learns data that a line can separate, but never XOR.',
                'A hidden layer combines several such lines. With a non-linear activation (tanh, sigmoid, ReLU) the network can bend the boundary around any shape – the more neurons, the more complex the shape.',
                'Training is gradient descent on the loss: every epoch moves all the weights a little. The line widths in the network drawing show how strong each weight has become.',
            ],
            sr: [
                'Perceptron sabira otežane ulaze i odlučuje po znaku: njegova granica odlučivanja je uvek prava linija. Nauči podatke koje prava razdvaja, ali XOR nikada.',
                'Skriveni sloj kombinuje više takvih linija. Uz nelinearnu aktivaciju (tanh, sigmoid, ReLU) mreža može da savije granicu oko bilo kog oblika – što više neurona, to složeniji oblik.',
                'Trening je gradijentni spust po gubitku: svaka epoha malo pomeri sve težine. Debljina linija na crtežu mreže pokazuje koliko je koja težina postala jaka.',
            ],
            sk: [
                'Perceptrón sčíta vážené vstupy a rozhodne podľa znamienka: jeho rozhodovacia hranica je vždy priamka. Naučí sa dáta, ktoré priamka oddelí, ale XOR nikdy.',
                'Skrytá vrstva kombinuje viac takých priamok. S nelineárnou aktiváciou (tanh, sigmoid, ReLU) môže sieť ohnúť hranicu okolo akéhokoľvek tvaru – čím viac neurónov, tým zložitejší tvar.',
                'Trénovanie je gradientný zostup po chybe: každá epocha trochu posunie všetky váhy. Hrúbka čiar na nákrese siete ukazuje, aká silná je každá váha.',
            ],
            pt: [
                'Um perceptrão soma as entradas ponderadas e decide pelo sinal: a sua fronteira de decisão é sempre uma linha reta. Aprende dados que uma reta separa, mas nunca o XOR.',
                'Uma camada oculta combina várias dessas retas. Com uma ativação não linear (tanh, sigmoide, ReLU) a rede consegue curvar a fronteira à volta de qualquer forma – quantos mais neurónios, mais complexa a forma.',
                'O treino é a descida do gradiente sobre a perda: cada época move um pouco todos os pesos. A espessura das linhas no desenho da rede mostra a força de cada peso.',
            ],
        },
        options: {dataset: 'xor', layers: 0, neurons: 4, activation: 'tanh', lr: 0.3, seed: 1, epochs: 0},
        state: (s) => ({dataset: s.datasetKey, layers: s.layers, neurons: s.neurons, activation: s.activation, lr: s.lr,
            seed: s.seed, epochs: s.epoch}),
        challenges: [
            {
                setup: {dataset: 'linear', layers: 0, neurons: 4, activation: 'tanh', lr: 0.3, seed: 1},
                text: {
                    en: 'Linearly separable data: train a perceptron (0 hidden layers) to accuracy ≥ 99%.',
                    sr: 'Linearno razdvojivi podaci: istrenirajte perceptron (0 skrivenih slojeva) do tačnosti ≥ 99%.',
                    sk: 'Lineárne oddeliteľné dáta: natrénujte perceptrón (0 skrytých vrstiev) na presnosť ≥ 99 %.',
                    pt: 'Dados linearmente separáveis: treine um perceptrão (0 camadas ocultas) até exatidão ≥ 99%.',
                },
                check: (p, m) => p.layers === 0 && m.accuracy >= 0.99,
            },
            {
                setup: {dataset: 'xor', layers: 0, neurons: 4, activation: 'tanh', lr: 0.3, seed: 1},
                text: {
                    en: 'XOR: a perceptron stays at 50%. Add a hidden layer and reach accuracy ≥ 98% with at most 4 hidden neurons.',
                    sr: 'XOR: perceptron ostaje na 50%. Dodajte skriveni sloj i dostignite tačnost ≥ 98% sa najviše 4 skrivena neurona.',
                    sk: 'XOR: perceptrón zostane na 50 %. Pridajte skrytú vrstvu a dosiahnite presnosť ≥ 98 % s najviac 4 skrytými neurónmi.',
                    pt: 'XOR: um perceptrão fica nos 50%. Adicione uma camada oculta e atinja exatidão ≥ 98% com no máximo 4 neurónios ocultos.',
                },
                check: (p, m) => p.hidden > 0 && p.hidden <= 4 && m.accuracy >= 0.98,
            },
            {
                setup: {dataset: 'circles', layers: 1, neurons: 2, activation: 'tanh', lr: 0.3, seed: 1},
                text: {
                    en: 'Circle in a circle: reach accuracy ≥ 98% with at most 4 hidden neurons (if training stalls, try new weights).',
                    sr: 'Krug u krugu: dostignite tačnost ≥ 98% sa najviše 4 skrivena neurona (ako učenje zastane, probajte nove težine).',
                    sk: 'Kruh v kruhu: dosiahnite presnosť ≥ 98 % s najviac 4 skrytými neurónmi (ak sa učenie zastaví, skúste nové váhy).',
                    pt: 'Círculo dentro de círculo: atinja exatidão ≥ 98% com no máximo 4 neurónios ocultos (se o treino parar, experimente novos pesos).',
                },
                check: (p, m) => p.hidden > 0 && p.hidden <= 4 && m.accuracy >= 0.98,
            },
        ],
    },
    {
        id: 'convolution',
        file: 'convolution.js',
        cls: 'ConvolutionSim',
        icon: '🖼️',
        level: 2,
        title: {
            en: 'Convolution & Image Filters',
            sr: 'Konvolucija i filteri slike',
            sk: 'Konvolúcia a obrazové filtre',
            pt: 'Convolução e filtros de imagem',
        },
        summary: {
            en: 'How a 3×3 grid of weights blurs, sharpens or finds edges – the first step of every image-recognition network.',
            sr: 'Kako mreža 3×3 težina zamućuje, izoštrava ili pronalazi ivice – prvi korak svake mreže za prepoznavanje slika.',
            sk: 'Ako mriežka 3×3 váh rozmazáva, zaostruje alebo hľadá hrany – prvý krok každej siete na rozpoznávanie obrazu.',
            pt: 'Como uma grelha 3×3 de pesos desfoca, realça ou encontra contornos – o primeiro passo de qualquer rede de reconhecimento de imagens.',
        },
        about: {
            en: [
                'A grayscale image is a table of numbers (0 = black, 1 = white). A convolution slides a small 3×3 kernel over it: every output pixel is the sum of the 9 surrounding pixels multiplied by the kernel weights, divided by the divisor.',
                'Equal positive weights average the neighbours and blur the image (and its noise). Weights that subtract one side from the other respond only where the brightness changes – at edges. Tap a pixel to see the calculation.',
                'A convolutional neural network (CNN) does exactly this, but learns the kernel weights itself: the first layers find edges, the later ones combine them into shapes and objects.',
            ],
            sr: [
                'Crno-bela slika je tabela brojeva (0 = crno, 1 = belo). Konvolucija klizi malim kernelom 3×3 preko nje: svaki piksel rezultata je zbir 9 okolnih piksela pomnoženih težinama kernela, podeljen deliocem.',
                'Jednake pozitivne težine uprosečavaju susede i zamućuju sliku (i njen šum). Težine koje oduzimaju jednu stranu od druge reaguju samo tamo gde se svetlina menja – na ivicama. Dodirnite piksel da vidite računanje.',
                'Konvoluciona neuronska mreža (CNN) radi upravo ovo, ali težine kernela uči sama: prvi slojevi pronalaze ivice, kasniji ih spajaju u oblike i predmete.',
            ],
            sk: [
                'Čiernobiely obrázok je tabuľka čísel (0 = čierna, 1 = biela). Konvolúcia po ňom posúva malé jadro 3×3: každý výstupný pixel je súčet 9 okolitých pixelov vynásobených váhami jadra, vydelený deliteľom.',
                'Rovnaké kladné váhy spriemerujú susedov a rozmažú obrázok (aj jeho šum). Váhy, ktoré odčítajú jednu stranu od druhej, reagujú len tam, kde sa mení jas – na hranách. Ťuknite na pixel a uvidíte výpočet.',
                'Konvolučná neurónová sieť (CNN) robí presne toto, ale váhy jadier sa učí sama: prvé vrstvy hľadajú hrany, ďalšie ich skladajú do tvarov a predmetov.',
            ],
            pt: [
                'Uma imagem em tons de cinzento é uma tabela de números (0 = preto, 1 = branco). A convolução desliza sobre ela um pequeno núcleo 3×3: cada píxel do resultado é a soma dos 9 píxeis vizinhos multiplicados pelos pesos do núcleo, dividida pelo divisor.',
                'Pesos positivos iguais fazem a média dos vizinhos e desfocam a imagem (e o seu ruído). Pesos que subtraem um lado ao outro só reagem onde o brilho muda – nos contornos. Toque num píxel para ver o cálculo.',
                'Uma rede neuronal convolucional (CNN) faz exatamente isto, mas aprende ela própria os pesos dos núcleos: as primeiras camadas encontram contornos, as seguintes juntam-nos em formas e objetos.',
            ],
        },
        options: {image: 'shapes', preset: 'identity', kernel: '', divisor: '', abs: '', target: '', presets: true},
        state: (s) => ({image: s.imageKey, kernel: s.kernel.join(','), divisor: s.divisor, abs: s.abs, target: s.targetKey,
            presets: s.showPresets}),
        challenges: [
            {
                setup: {image: 'stripes', preset: 'identity', target: 'sobelx', presets: true},
                text: {
                    en: 'Stripes: which ready-made filter produces the target image? Reach a match of at least 95%.',
                    sr: 'Pruge: koji gotov filter daje ciljnu sliku? Dostignite podudaranje od bar 95%.',
                    sk: 'Pruhy: ktorý hotový filter vytvorí cieľový obrázok? Dosiahnite zhodu aspoň 95 %.',
                    pt: 'Riscas: que filtro pronto produz a imagem-alvo? Atinja uma correspondência de pelo menos 95%.',
                },
                check: (p, m) => p.target === 'sobelx' && m.match >= 0.95,
            },
            {
                setup: {image: 'noisy', preset: 'identity', target: 'gaussian', presets: false},
                text: {
                    en: 'Noisy image, no ready-made filters: type a kernel and divisor that remove the noise like the target (match ≥ 95%).',
                    sr: 'Slika sa šumom, bez gotovih filtera: upišite kernel i delilac koji uklanjaju šum kao na cilju (podudaranje ≥ 95%).',
                    sk: 'Zašumený obrázok, bez hotových filtrov: zadajte jadro a deliteľ, ktoré odstránia šum ako na cieli (zhoda ≥ 95 %).',
                    pt: 'Imagem com ruído, sem filtros prontos: escreva um núcleo e um divisor que removam o ruído como no alvo (correspondência ≥ 95%).',
                },
                check: (p, m) => p.target === 'gaussian' && m.match >= 0.95,
            },
            {
                setup: {image: 'shapes', preset: 'identity', target: 'sobely', presets: false},
                text: {
                    en: 'Build a horizontal edge detector by hand: weights, divisor and absolute value (match ≥ 95%).',
                    sr: 'Napravite ručno detektor horizontalnih ivica: težine, delilac i apsolutna vrednost (podudaranje ≥ 95%).',
                    sk: 'Zostavte ručne detektor vodorovných hrán: váhy, deliteľ a absolútna hodnota (zhoda ≥ 95 %).',
                    pt: 'Construa à mão um detetor de contornos horizontais: pesos, divisor e valor absoluto (correspondência ≥ 95%).',
                },
                check: (p, m) => p.target === 'sobely' && m.match >= 0.95,
            },
        ],
    },
    {
        id: 'q-learning',
        file: 'q_learning.js',
        cls: 'QLearningSim',
        icon: '🤖',
        level: 3,
        title: {
            en: 'Reinforcement Learning (Q-learning)',
            sr: 'Učenje potkrepljivanjem (Q-learning)',
            sk: 'Posilňované učenie (Q-learning)',
            pt: 'Aprendizagem por reforço (Q-learning)',
        },
        summary: {
            en: 'An agent learns from rewards alone: exploration vs exploitation, and why the discount factor decides between a small reward now and a big one later.',
            sr: 'Agent uči samo iz nagrada: istraživanje naspram iskorišćavanja i zašto faktor umanjenja bira između male nagrade sada i velike kasnije.',
            sk: 'Agent sa učí len z odmien: skúmanie verzus využívanie a prečo diskontný faktor rozhoduje medzi malou odmenou teraz a veľkou neskôr.',
            pt: 'Um agente aprende só com recompensas: exploração versus aproveitamento, e porque o fator de desconto decide entre uma recompensa pequena agora e uma grande depois.',
        },
        about: {
            en: [
                'Nobody shows the agent the way. It moves, gets a reward (−0.1 per step, +10 at the goal, −10 off the cliff) and stores in a Q-table how good every move is in every cell.',
                'Q(s,a) ← Q(s,a) + α · (r + γ · max Q(s′,·) − Q(s,a)). The learning rate α sets how fast new experience overwrites the old, the discount factor γ how much future rewards count.',
                'With probability ε the agent makes a random move. Without exploration it keeps repeating what it already knows and may never find a better reward – the exploration–exploitation dilemma, behind game AIs and robot control alike.',
            ],
            sr: [
                'Agentu niko ne pokazuje put. On se pomera, dobija nagradu (−0.1 po koraku, +10 na cilju, −10 kad padne sa litice) i u Q-tabeli pamti koliko je dobar svaki potez u svakom polju.',
                'Q(s,a) ← Q(s,a) + α · (r + γ · max Q(s′,·) − Q(s,a)). Stopa učenja α određuje koliko brzo novo iskustvo menja staro, a faktor umanjenja γ koliko vrede buduće nagrade.',
                'Sa verovatnoćom ε agent pravi nasumičan potez. Bez istraživanja ponavlja ono što već zna i možda nikad ne nađe bolju nagradu – dilema istraživanja i iskorišćavanja, na kojoj počivaju i AI za igre i upravljanje robotima.',
            ],
            sk: [
                'Agentovi nikto neukáže cestu. Pohybuje sa, dostáva odmenu (−0,1 za krok, +10 v cieli, −10 pri páde z útesu) a v Q-tabuľke si pamätá, aký dobrý je každý ťah v každom poli.',
                'Q(s,a) ← Q(s,a) + α · (r + γ · max Q(s′,·) − Q(s,a)). Rýchlosť učenia α určuje, ako rýchlo nová skúsenosť prepíše starú, diskontný faktor γ, koľko platia budúce odmeny.',
                'S pravdepodobnosťou ε urobí agent náhodný ťah. Bez skúmania opakuje to, čo už pozná, a možno nikdy nenájde lepšiu odmenu – dilema skúmania a využívania, na ktorej stoja herné AI aj riadenie robotov.',
            ],
            pt: [
                'Ninguém mostra o caminho ao agente. Ele move-se, recebe uma recompensa (−0,1 por passo, +10 no objetivo, −10 se cair da falésia) e guarda numa tabela Q quão bom é cada movimento em cada casa.',
                'Q(s,a) ← Q(s,a) + α · (r + γ · max Q(s′,·) − Q(s,a)). A taxa de aprendizagem α define a rapidez com que a nova experiência substitui a antiga, o fator de desconto γ quanto valem as recompensas futuras.',
                'Com probabilidade ε o agente faz um movimento aleatório. Sem exploração repete o que já conhece e pode nunca encontrar uma recompensa melhor – o dilema exploração–aproveitamento, presente tanto na IA de jogos como no controlo de robôs.',
            ],
        },
        options: {map: 'maze', alpha: 0.5, gamma: 0.9, epsilon: 0.2, seed: 1, episodes: 0},
        state: (s) => ({map: s.mapKey, alpha: s.alpha, gamma: s.gamma, epsilon: s.epsilon, seed: s.seed, episodes: s.episode}),
        challenges: [
            {
                setup: {map: 'maze', alpha: 0.5, gamma: 0.9, epsilon: 0.2, seed: 1},
                text: {
                    en: 'Maze: train the agent until its policy takes the shortest path (10 steps), in at most 200 episodes.',
                    sr: 'Lavirint: trenirajte agenta dok njegova politika ne bude išla najkraćim putem (10 koraka), za najviše 200 epizoda.',
                    sk: 'Bludisko: trénujte agenta, kým jeho stratégia nepôjde najkratšou cestou (10 krokov), najviac za 200 epizód.',
                    pt: 'Labirinto: treine o agente até a sua política seguir o caminho mais curto (10 passos), em no máximo 200 episódios.',
                },
                check: (p, m) => p.map === 'maze' && m.reached && m.steps <= 10 && p.episodes <= 200,
            },
            {
                setup: {map: 'cliff', alpha: 0.5, gamma: 0.9, epsilon: 0.2, seed: 1},
                text: {
                    en: 'Cliff: the shortest path runs right along the edge. Get a policy that walks it (11 steps) within 500 episodes – then compare the average reward with ε = 0.05 and ε = 0.4.',
                    sr: 'Litica: najkraći put vodi tik uz ivicu. Dobijte politiku koja ide njime (11 koraka) za najviše 500 epizoda – zatim uporedite prosečnu nagradu uz ε = 0.05 i ε = 0.4.',
                    sk: 'Útes: najkratšia cesta vedie tesne popri okraji. Získajte stratégiu, ktorá ňou ide (11 krokov), najviac za 500 epizód – potom porovnajte priemernú odmenu pri ε = 0,05 a ε = 0,4.',
                    pt: 'Falésia: o caminho mais curto passa junto à borda. Obtenha uma política que o siga (11 passos) em no máximo 500 episódios – depois compare a recompensa média com ε = 0,05 e ε = 0,4.',
                },
                check: (p, m) => p.map === 'cliff' && m.reached && m.steps <= 11 && p.episodes <= 500,
            },
            {
                setup: {map: 'treasure', alpha: 0.5, gamma: 0.5, epsilon: 0.1, seed: 1},
                text: {
                    en: 'Near or far: the agent grabs the small treasure (+3). Change γ and ε so that it learns to go for the big goal G (+10) in 4 steps.',
                    sr: 'Blizu ili daleko: agent uzima malo blago (+3). Promenite γ i ε tako da nauči da ide do velikog cilja G (+10) u 4 koraka.',
                    sk: 'Blízko alebo ďaleko: agent berie malý poklad (+3). Zmeňte γ a ε tak, aby sa naučil ísť k veľkému cieľu G (+10) za 4 kroky.',
                    pt: 'Perto ou longe: o agente apanha o tesouro pequeno (+3). Altere γ e ε para que aprenda a ir até ao objetivo grande G (+10) em 4 passos.',
                },
                check: (p, m) => p.map === 'treasure' && m.reached && m.steps <= 4,
            },
        ],
    },
    {
        id: 'data-bias',
        file: 'data_bias.js',
        cls: 'DataBiasSim',
        icon: '⚖️',
        level: 2,
        title: {
            en: 'Data Split & Bias',
            sr: 'Podela podataka i pristrasnost',
            sk: 'Rozdelenie dát a skreslenie',
            pt: 'Divisão de dados e enviesamento',
        },
        summary: {
            en: 'Why a model needs a separate test set – and why even a good test score can hide a model that fails for a group missing from the data.',
            sr: 'Zašto modelu treba poseban test skup – i zašto i dobar rezultat na testu može da sakrije model koji ne radi za grupu koje nema u podacima.',
            sk: 'Prečo model potrebuje samostatnú testovaciu množinu – a prečo aj dobré skóre na teste môže skryť model, ktorý zlyháva pre skupinu chýbajúcu v dátach.',
            pt: 'Porque é que um modelo precisa de um conjunto de teste separado – e porque é que até um bom resultado no teste pode esconder um modelo que falha para um grupo ausente dos dados.',
        },
        about: {
            en: [
                'A model is trained on one part of the data and measured on another part it has never seen (the test set). Accuracy on the training data says little: with k = 1 the model simply memorises every point and scores 100%.',
                'But the test set comes from the same sample. If the sample contains almost no parts from factory B, the test set does not either – the test score looks excellent while the model fails for factory B in the real world.',
                'This is how biased data turns into an unfair model, whether it judges machine parts, loan applications or medical images. The cure is representative data and measuring each group separately.',
            ],
            sr: [
                'Model se trenira na jednom delu podataka, a meri na drugom delu koji nikad nije video (test skup). Tačnost na podacima za trening malo govori: sa k = 1 model samo zapamti svaku tačku i ima 100%.',
                'Ali test skup potiče iz istog uzorka. Ako uzorak skoro da nema delova iz fabrike B, nema ih ni test skup – rezultat na testu izgleda odlično, a model u stvarnom svetu ne radi za fabriku B.',
                'Tako pristrasni podaci postaju nepravedan model, bilo da ocenjuje mašinske delove, zahteve za kredit ili medicinske snimke. Lek su reprezentativni podaci i merenje svake grupe posebno.',
            ],
            sk: [
                'Model sa trénuje na jednej časti dát a meria na inej časti, ktorú nikdy nevidel (testovacia množina). Presnosť na trénovacích dátach veľa nehovorí: pri k = 1 si model len zapamätá každý bod a má 100 %.',
                'Testovacia množina však pochádza z tej istej vzorky. Ak vzorka takmer neobsahuje diely z továrne B, neobsahuje ich ani test – skóre na teste vyzerá výborne, no model v skutočnom svete pre továreň B zlyháva.',
                'Takto sa zo skreslených dát stáva nespravodlivý model, či posudzuje strojové diely, žiadosti o úver alebo medicínske snímky. Liekom sú reprezentatívne dáta a meranie každej skupiny zvlášť.',
            ],
            pt: [
                'Um modelo é treinado com uma parte dos dados e avaliado noutra parte que nunca viu (o conjunto de teste). A exatidão nos dados de treino diz pouco: com k = 1 o modelo memoriza cada ponto e obtém 100%.',
                'Mas o conjunto de teste vem da mesma amostra. Se a amostra quase não tem peças da fábrica B, o teste também não – o resultado do teste parece excelente, enquanto no mundo real o modelo falha para a fábrica B.',
                'É assim que dados enviesados se tornam um modelo injusto, quer avalie peças, pedidos de crédito ou imagens médicas. A solução são dados representativos e medir cada grupo separadamente.',
            ],
        },
        options: {population: 'shifted', n: 200, share: 5, test: 25, k: 5, seed: 1},
        state: (s) => ({population: s.population, n: s.n, share: s.share, test: s.testPct, k: s.k, seed: s.seed}),
        challenges: [
            {
                setup: {population: 'shifted', n: 200, share: 5, test: 25, k: 5, seed: 1},
                text: {
                    en: 'The test set says about 95%, yet factory B is far lower. Change the data so that the real-world accuracy for factory B reaches at least 88%.',
                    sr: 'Test skup kaže oko 95%, a fabrika B je mnogo niže. Promenite podatke tako da stvarna tačnost za fabriku B dostigne bar 88%.',
                    sk: 'Testovacia množina ukazuje asi 95 %, no továreň B je oveľa nižšie. Zmeňte dáta tak, aby skutočná presnosť pre továreň B dosiahla aspoň 88 %.',
                    pt: 'O conjunto de teste indica cerca de 95%, mas a fábrica B fica muito abaixo. Altere os dados para que a exatidão real na fábrica B chegue a pelo menos 88%.',
                },
                check: (p, m) => p.population === 'shifted' && m.accB >= 0.88,
            },
            {
                setup: {population: 'shifted', n: 400, share: 5, test: 25, k: 5, seed: 1},
                text: {
                    en: 'Collecting data is expensive: with at most 120 samples, get both factories to a real-world accuracy of at least 88%.',
                    sr: 'Prikupljanje podataka je skupo: sa najviše 120 uzoraka dovedite obe fabrike do stvarne tačnosti od bar 88%.',
                    sk: 'Zber dát je drahý: s najviac 120 vzorkami dosiahnite v oboch továrňach skutočnú presnosť aspoň 88 %.',
                    pt: 'Recolher dados é caro: com no máximo 120 amostras, leve as duas fábricas a uma exatidão real de pelo menos 88%.',
                },
                check: (p, m) => p.population === 'shifted' && p.n <= 120 && m.worst >= 0.88,
            },
            {
                setup: {population: 'shifted', n: 200, share: 40, test: 25, k: 1, seed: 1},
                text: {
                    en: 'With k = 1 the training accuracy is 100% – memorisation. Choose k > 1 so that both factories reach at least 90% with a gap of at most 5%.',
                    sr: 'Sa k = 1 tačnost na treningu je 100% – pamćenje. Izaberite k > 1 tako da obe fabrike dostignu bar 90%, uz razliku od najviše 5%.',
                    sk: 'Pri k = 1 je presnosť na tréningu 100 % – memorovanie. Zvoľte k > 1 tak, aby obe továrne dosiahli aspoň 90 % s rozdielom najviac 5 %.',
                    pt: 'Com k = 1 a exatidão no treino é 100% – memorização. Escolha k > 1 para que as duas fábricas atinjam pelo menos 90% com uma diferença de no máximo 5%.',
                },
                check: (p, m) => p.k > 1 && m.worst >= 0.9 && m.gap <= 0.05,
            },
        ],
    },
];

export const findSim = (id) => SIMS.find((s) => s.id === id);
