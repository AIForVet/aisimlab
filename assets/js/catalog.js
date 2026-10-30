// The five simulations of AISim Lab: engine, URL options, embed attributes, explanation and challenges.
// Challenge thresholds were measured on the engines (random datasets included), so every challenge can be solved.

const f1 = (m) => 2 * m.precision * m.recall / ((m.precision + m.recall) || 1);

export const SIMS = [
    {
        id: 'gradient-descent',
        file: 'gradient_descent.js',
        cls: 'GradientDescentSim',
        icon: '📉',
        level: 1,
        title: {en: 'Gradient Descent', sr: 'Gradijentni spust'},
        summary: {
            en: 'How a model learns step by step: learning rate, convergence, divergence and local minima.',
            sr: 'Kako model uči korak po korak: stopa učenja, konvergencija, divergencija i lokalni minimumi.',
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
        },
        options: {profile: 'convex', lr: '', w0: ''},
        state: (s) => ({profile: s.selectedProfileKey, lr: s.alpha, w0: s.w0}),
        challenges: [
            {
                setup: {profile: 'convex', lr: 0.15, w0: -0.5},
                text: {
                    en: 'Reach the minimum (J(w) ≤ 1.01) in at most 20 steps.',
                    sr: 'Stignite do minimuma (J(w) ≤ 1.01) za najviše 20 koraka.',
                },
                check: (p, m) => p.steps > 0 && p.steps <= 20 && m.loss <= 1.01,
            },
            {
                setup: {profile: 'convex', lr: 0.15, w0: -0.5},
                text: {
                    en: 'Find a learning rate at which training diverges (J(w) > 50).',
                    sr: 'Pronađite stopu učenja pri kojoj trening divergira (J(w) > 50).',
                },
                check: (p, m) => !(m.loss <= 50),
            },
            {
                setup: {profile: 'nonconvex', lr: 0.08, w0: -2.2},
                text: {
                    en: 'Non-convex curve: escape the local minimum and reach the global one (J(w) ≤ 1.0).',
                    sr: 'Nekonveksna kriva: izbegnite lokalni minimum i stignite do globalnog (J(w) ≤ 1.0).',
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
        title: {en: 'Confusion Matrix & Threshold', sr: 'Matrica konfuzije i prag odluke'},
        summary: {
            en: 'Precision, recall and F1: why the decision threshold depends on the cost of each mistake.',
            sr: 'Preciznost, odziv i F1: zašto prag odluke zavisi od cene svake greške.',
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
        },
        options: {scenario: 'quality', threshold: 0.5},
        state: (s) => ({scenario: s.scenarioKey, threshold: s.threshold}),
        challenges: [
            {
                setup: {scenario: 'quality', threshold: 0.3},
                text: {
                    en: 'Quality control: set the threshold so that F1 ≥ 0.80.',
                    sr: 'Kontrola kvaliteta: podesite prag tako da F1 ≥ 0.80.',
                },
                check: (p, m) => f1(m) >= 0.80,
            },
            {
                setup: {scenario: 'medical', threshold: 0.5},
                text: {
                    en: 'Medical screening: miss almost no patient (recall ≥ 0.95) while keeping precision ≥ 0.50.',
                    sr: 'Medicinski skrining: ne propustite gotovo nijednog pacijenta (odziv ≥ 0.95) uz preciznost ≥ 0.50.',
                },
                check: (p, m) => m.recall >= 0.95 && m.precision >= 0.50,
            },
            {
                setup: {scenario: 'spam', threshold: 0.5},
                text: {
                    en: 'Spam filter: almost never block a legitimate message (precision ≥ 0.95) and still catch recall ≥ 0.40.',
                    sr: 'Spam filter: gotovo nikad ne blokirajte ispravnu poruku (preciznost ≥ 0.95), a ipak uhvatite odziv ≥ 0.40.',
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
        title: {en: 'Polynomial Regression & Overfitting', sr: 'Polinomska regresija i preprilagođavanje'},
        summary: {
            en: 'Underfitting, overfitting and regularization: why a perfect fit on training data is a warning sign.',
            sr: 'Potprilagođavanje, preprilagođavanje i regularizacija: zašto savršeno slaganje sa podacima za učenje nije dobar znak.',
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
        },
        options: {dataset: 'sine', degree: 3, lambda: 0},
        state: (s) => ({dataset: s.datasetKey, degree: s.degree, lambda: s.lambda}),
        challenges: [
            {
                setup: {dataset: 'sine', degree: 1, lambda: 0},
                text: {
                    en: 'Sine data: find a degree with validation MSE < 0.20.',
                    sr: 'Sinusni podaci: pronađite stepen sa validacionom greškom MSE < 0.20.',
                },
                check: (p, m) => m.valMse < 0.20,
            },
            {
                setup: {dataset: 'sine', degree: 3, lambda: 0},
                text: {
                    en: 'Show overfitting: training MSE < 0.01 while validation MSE > 0.20.',
                    sr: 'Pokažite preprilagođavanje: greška učenja MSE < 0.01, a validaciona MSE > 0.20.',
                },
                check: (p, m) => m.trainMse < 0.01 && m.valMse > 0.20,
            },
            {
                setup: {dataset: 'quadratic', degree: 9, lambda: 0},
                text: {
                    en: 'Keep degree 9, but use regularization λ to get validation MSE < 0.14.',
                    sr: 'Zadržite stepen 9, ali regularizacijom λ spustite validacionu grešku MSE ispod 0.14.',
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
        title: {en: 'Decision Boundaries: k-NN & Decision Tree', sr: 'Granice odlučivanja: k-NN i stablo odlučivanja'},
        summary: {
            en: 'Two ways to split the plane: smooth neighbourhoods (k-NN) or straight cuts (decision tree).',
            sr: 'Dva načina da se podeli ravan: glatka susedstva (k-NN) ili pravi rezovi (stablo odlučivanja).',
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
                },
                check: (p, m) => p.model === 'tree' && m.testAcc >= 0.95,
            },
            {
                setup: {model: 'tree', dataset: 'circles', k: 3, depth: 1},
                text: {
                    en: 'Circles with a tree of depth at most 3: reach accuracy ≥ 90%.',
                    sr: 'Krugovi sa stablom dubine najviše 3: dostignite tačnost ≥ 90%.',
                },
                check: (p, m) => p.model === 'tree' && p.depth <= 3 && m.testAcc >= 0.90,
            },
            {
                setup: {model: 'knn', dataset: 'moons', k: 1, depth: 3},
                text: {
                    en: 'Two moons with k-NN: use k ≥ 7 for a smooth boundary and keep accuracy ≥ 95%.',
                    sr: 'Dva polumeseca sa k-NN: uzmite k ≥ 7 za glatku granicu i zadržite tačnost ≥ 95%.',
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
        title: {en: 'K-Means Clustering', sr: 'Klasterovanje K-Means'},
        summary: {
            en: 'Unsupervised learning: group points without labels, choose K with the elbow method.',
            sr: 'Učenje bez nadzora: grupisanje tačaka bez oznaka i izbor K metodom lakta.',
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
        },
        options: {dataset: 'blobs3', k: 3},
        state: (s) => ({dataset: s.datasetKey, k: s.k}),
        challenges: [
            {
                setup: {dataset: 'blobs3', k: 2},
                text: {
                    en: 'Three groups: choose the right K and run to convergence with WCSS ≤ 10.',
                    sr: 'Tri grupe: izaberite pravo K i pokrenite do konvergencije sa WCSS ≤ 10.',
                },
                check: (p, m) => m.converged && m.wcss <= 10,
            },
            {
                setup: {dataset: 'blobs4', k: 4},
                text: {
                    en: 'Four groups with K = 4: reach WCSS ≤ 10 (if it gets stuck, re-seed the centroids).',
                    sr: 'Četiri grupe sa K = 4: dostignite WCSS ≤ 10 (ako zaglavi, ponovo postavite centroide).',
                },
                check: (p, m) => p.k === 4 && m.converged && m.wcss <= 10,
            },
            {
                setup: {dataset: 'blobs3', k: 3},
                text: {
                    en: 'Show why WCSS alone cannot choose K: on three groups get WCSS < 7.',
                    sr: 'Pokažite zašto sam WCSS ne može da izabere K: na tri grupe dobijte WCSS < 7.',
                },
                check: (p, m) => m.converged && m.wcss < 7,
            },
        ],
    },
];

export const findSim = (id) => SIMS.find((s) => s.id === id);
