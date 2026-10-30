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
];

export const findSim = (id) => SIMS.find((s) => s.id === id);
