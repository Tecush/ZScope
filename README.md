![ZScope Banner](https://raw.githubusercontent.com/Tecush/ZScope/main/images/splash.png)

<div align="center">
  <img width="80" height="80" alt="ZScope Icon" src="https://github.com/user-attachments/assets/c23f0756-3dc3-46ac-a2b2-4c69e630ff50" />

  <h1>ZScope</h1>

  <p><em>Publication-Grade Electrochemical Impedance Spectroscopy Platform</em></p>

  <p>
    <a href="https://github.com/Tecush/ZScope/releases/latest"><img src="https://img.shields.io/github/v/release/Tecush/ZScope?label=Latest%20Release&style=flat-square&color=1d6fb5" alt="Latest Release"/></a>&nbsp;
    <a href="https://doi.org/10.5281/zenodo.20357547"><img src="https://zenodo.org/badge/DOI/10.5281/zenodo.20357547.svg" alt="DOI"/></a>&nbsp;
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-22c55e?style=flat-square" alt="MIT License"/></a>&nbsp;
    <a href="https://github.com/Tecush/ZScope/issues"><img src="https://img.shields.io/github/issues/Tecush/ZScope?style=flat-square&color=f59e0b" alt="Open Issues"/></a>&nbsp;
    <img src="https://img.shields.io/badge/Platform-Windows-0ea5e9?style=flat-square" alt="Windows"/>&nbsp;
    <img src="https://img.shields.io/badge/No%20Python%20Required-✓-22c55e?style=flat-square" alt="Standalone"/>
  </p>

  <p>
    <a href="#-the-story-behind-zscope">Story</a> ·
    <a href="#-whats-new-in-30">What's New</a> ·
    <a href="#-key-capabilities">Capabilities</a> ·
    <a href="#-recommended-workflow">Workflow</a> ·
    <a href="#-validation--benchmarks">Benchmarks</a> ·
    <a href="#-scientific-applications">Applications</a> ·
    <a href="#-why-zscope">Comparison</a> ·
    <a href="#-installation">Installation</a> ·
    <a href="#-citation">Citation</a>
  </p>
</div>

---

## 🔬 The Story Behind ZScope

ZScope was not designed in the abstract. It was born from a real experimental problem.

During an electrochemical study, I needed to capture a baseline EIS spectrum at the start of a reaction — then measure six more spectra at different oxidation states as the reaction progressed. Each spectrum represented a distinct state of the system, and together they told the story of a mechanism evolving in time.

The analysis became a frustration. Working through seven spectra with existing tools was slow, disjointed, and offered no intuitive sense of how parameters evolved across the series. There was no way to *interactively explore* the relationship between circuit components and spectrum shape — to build the physical intuition that makes EIS meaningful.

I kept thinking: **what if I could draw a circuit, move a slider, and watch the simulated Nyquist plot respond in real time — overlaid on my experimental data?** Not as a fitter, but as a lens for understanding. A way to arrive at a physically motivated starting point before handing off to a numerical optimizer.

That idea became the first version of ZScope.

As the tool took shape, it grew. The fitting engine followed — built with the same insistence on reliability and physical transparency. Then Bayesian uncertainty quantification, because a parameter without an honest uncertainty estimate has limited scientific value. Then data validation, custom components, automatic circuit suggestion, and structured reporting.

**Version 3.0 finally closes the loop on the problem that started it.** Those seven spectra were never seven separate experiments — they were one measurement with something varying across it. ZScope now treats a set of spectra as the series it is: record what changed between them, fit them all in one pass, and read the physics off a trend rather than off a single curve.

ZScope is the tool I needed during that experiment. It is free, and I hope it gives other researchers something better than what was available to me.

> **Distribution:** ZScope is released as a ready-to-install application for Windows. Source code is not publicly distributed. Full scientific documentation, validation benchmarks, and an in-app help manual are provided so you can trust what happens inside.

---

## 🚀 What's New in 3.0

ZScope 2.x was a very good tool for fitting **one spectrum**. Version 3.0 is about everything around that: understanding what your circuit is doing, controlling how it is fitted, deciding which circuit is right — and treating a set of spectra as a **series**.

### Your spectra are a series

**Record what varied.** A dataset used to be a spectrum and nothing else. It can now carry what it was measured *at* — temperature, bias, elapsed time, concentration, current density, cycle number, partial pressure, pH — entered for the whole set in one grid rather than one dialog per file. Values can be read out of the file names, and where a name carries the number without a unit (`cell_A_873_run1.txt`), type the first one and ZScope learns where it sits and fills the rest. Units are converted for you: enter 600 °C and an Arrhenius plot receives 873.15 K.

**Fit the whole series in one pass.** ⚡ **Fit All Datasets** applies the circuit on the canvas to every spectrum, seeding each fit from the previous one's result. Ordered by your series variable, consecutive spectra differ by one step, so the last fit is genuinely close to the next — faster and far steadier than a set of independent fits, and the reason the run is sequential rather than parallel. A spectrum that fails is marked and skipped rather than stopping the run, and a failed fit is never carried forward as a seed.

**Series Analysis** 📈 — plot any fitted parameter against whatever varied and fit a trend:

| Model | Gives you |
|---|---|
| **Arrhenius** | Activation energy in eV and kJ/mol |
| **Arrhenius ln(σT)** | The convention for ionic conductors |
| **Mott–Schottky** | Flat-band potential and dopant density |
| **Power law** | Reaction order against pO₂ or current density |
| **Exponential** | Degradation rate and half-life |
| **Linear** | The neutral choice |

Y can be a single parameter, the automatic sum of every resistance, or a combination you build by clicking — `R2 + R3` for a partial sum, `Rct × Cdl` for a time constant reported in seconds — and combinations can be named and kept.

The window is careful about what it will not claim: datasets you exclude are listed separately from ones that could not supply a point; a series where every spectrum shares the same X value is refused rather than fitted; an uncertainty as large as its own value is reported as *not determined* instead of printed as a measurement; and a two-point fit says outright that its R² of 1 means nothing.

### Getting the model right

**Compare circuit models** ⚖ — adding a component almost always lowers χ². That is not evidence it is real. Every fit is now remembered as a candidate and ranked by AICc (or AIC, or BIC) with Δ and Akaike weights, so *"two arcs or three?"* gets an answer instead of a lower residual. Any candidate can be put back on the canvas. Models fitted to *different* data are refused rather than ranked — a truncated fit has a lower AIC simply because it has less to explain.

**Deconvolve overlapping DRT peaks** 🔬 — peak detection integrates between the valleys, so two processes less than about a decade apart merge into one bump and the split between them is arbitrary. Since the area *is* the resistance, a wrong split is a wrong R that does not look wrong, because the total is still right. Deconvolution fits the whole γ(τ) curve with a sum of R‖CPE peaks instead, separating them by shape. On two processes 0.3 decades apart, detection reports one of 330 Ω where there are really two, of 120 and 200 Ω; deconvolution recovers both.

And you can do it **by hand, on the plot**: drag a peak sideways to move its time constant, up and down to change its resistance, click the curve to add one where the model falls short, then refit. Deciding how many processes there are is a judgement your eye makes better than any criterion — a criterion can only ever say *"more terms fit better"*.

**Build a circuit from the DRT** 🧩 — the DRT already knows how many processes there are and where they sit. Each peak becomes an R‖CPE branch with R from the peak area, τ from its position, and **α recovered from its width** — a ZARC has an analytic DRT whose width depends only on α, so the measured width inverts to the exponent that produced it.

**Control where the fit searches** — by default, fitting spreads its restarts across each parameter's whole allowed range, which means the result barely depends on what you entered. A new **Search scope** control changes that: *Anchored* draws restarts near your values, *Local* runs a single fit from them. It is what makes a DRT-derived circuit and a sequential sweep worth doing.

### Understanding one spectrum

**See what a component does** — double-click a part on the canvas and the plots show where it acts: the stretch of the Nyquist curve it governs redrawn thick and bright, the frequency band it dominates shaded on Bode and Phase, and faint ghost curves showing the spectrum with that component ten times larger and ten times smaller. Computed from your actual circuit rather than a textbook rule, so it stays correct for nested ladders, transmission lines and custom components. A component with no measurable effect says so — a quick way to spot an element left dangling.

**Change a parameter by dragging the plot** — the marker at the point of strongest influence can be dragged, and the component's value follows with the curve updating live. One undo step for the whole gesture.

**Simulation Report** — the fit report stops at the edge of your data. This one covers the full simulation grid, updates live, and labels every row **fitted**, **measured** or **extrapolated**, so a number predicted beyond your measurement is never mistaken for one the fit was constrained by.

### Reports that state what they mean

**Normalize by sample geometry** — an impedance in ohms describes your specimen, not your material. Enter the geometry once and the whole report converts: area-specific resistance, resistivity, conductivity, and for corrosion work the corrosion current density and penetration rate per ASTM G102. Eight applications: solid pellets, single cells and electrodes, membranes, liquid conductivity cells, corrosion and coatings, batteries and supercapacitors, and in-plane thin films.

The conversion follows each quantity's *unit* rather than its name, so resistances scale up, capacitances and CPE admittances scale down, and a CPE exponent or a relaxation time is correctly left alone. The symmetric-cell convention ASR = R·A/2 applies to the *electrode* resistance and not the electrolyte, so nothing is halved on its own: you mark which components are electrode processes and every halved parameter is flagged `(÷2)`. Geometry is stored per dataset, so a series of pellets each keeps its own.

**Effective capacitance from a CPE** — Q is an admittance in S·s<sup>α</sup> and means nothing on its own. The report converts it by **both** the Brug and Hsu–Mansfeld formulas, with τ and f<sub>peak</sub>, and states which resistances each used. They can differ by tens of percent, and which applies is a modelling assumption that belongs to you.

**Choose the imaginary sign, once** — reports show `Z″` or `−Z″`, switched with one checkbox. Headers always state which convention you are looking at, experimental and fitted always flip together, phase follows, and exports record the convention.

**Every value states its unit, and derived values carry their uncertainty.** Conductivity, i<sub>corr</sub> and effective capacitance inherit the uncertainty of the parameter they came from — a derived value with a blank error column beside a fitted one that has an error reads as the more certain of the two.

### Smaller, but you will notice

**DRT against τ or frequency**, switchable instantly with peak markers following. **Scientific notation everywhere**: type `1e-12`, `1E-12`, `1*10^-12` or a decimal comma; log-scaled parameters step ten clicks per decade. **Each dataset keeps its own frequency range**, saved with the project. **Circuit notation explains its errors**, showing the offending character and offering the legal rewritings rather than guessing. **The dataset panel opens itself** when a session becomes multi-dataset.

> **Note on precision:** a defect in the parameter entry boxes rounded every value below a nanounit to zero — and editing that row's bounds could write the zero back onto the component. Capacitances, CPE admittances, inductances and sub-nanosecond time constants were affected. If you have fits with parameters in that range, please re-run them.

<details>
<summary><strong>Previously — What's New in 2.2.0</strong></summary>

<br/>

**Save & Open Project** — an entire session now lives in one `.zscope` file: every loaded dataset with its circuit, its fit and Bayesian results, its DRT analysis, and its import column mapping. Reopen it and everything is where you left it. The file is an ordinary ZIP archive with a readable JSON manifest inside, so it can be inspected without ZScope, and numerical arrays are stored exactly — a reloaded project is bit-for-bit identical to the one you saved.

**Export datasets as separate project files** — split a batch into one independently-reopenable project per dataset. Unlike CSV export, each file keeps that dataset's circuit, fit and DRT results with it.

**Paste data from the clipboard** — copy a block of cells in Excel, LibreOffice, Origin or a text editor and press `Ctrl+V`; the import dialog opens on the pasted table. Separator and decimal convention are detected automatically, including semicolon-separated European exports with decimal commas (`1,0E+05;10,5`), which a naive parser reads off by a factor of ten.

**Import many files at once** — select or drag in a whole folder of spectra. ZScope reads each one, detects its columns, and shows a review list with point counts and frequency ranges before anything loads.

**Import source tracking** — every spectrum records how it was obtained: columns detected automatically, columns chosen by you, or data values edited by hand.

**Drag and drop now asks** — dropping files offers *Add* or *Replace*. Closing the application offers to save unsaved work first.

</details>

<details>
<summary><strong>Previously — What's New in 2.1.0</strong></summary>

<br/>

**AI-enhanced circuit proposer** — local and online AI now assist the proposer in analysing your spectrum and suggesting equivalent circuit models.

**Bring your own AI account** — import and connect a personal or enterprise AI account to power the proposer.

**New benchmark suite** — integrated benchmarks for rigorously evaluating, comparing, and validating circuit model performance.

**Upgraded Fitting, DRT and Kramers–Kronig evaluation** — improved accuracy, better edge-case handling, and more robust metrics.

**Major fitting speed-up for large circuits** — the Jacobian is now derived analytically from the circuit rather than approximated by finite differences, costing one linear solve instead of one per parameter. Circuits with 10+ free parameters fit roughly 20–35× faster.

</details>

---

## ⚡ Key Capabilities

<table>
<tr>
<td width="50%" valign="top">

### 📈 Series Analysis

A single fit gives parameters. A **series** of fits gives physics.

Record what varied between your spectra, fit them all in one pass, then read the trend: activation energy from temperature, flat-band potential from bias, degradation rate from time, reaction order from partial pressure.

- Arrhenius · Mott–Schottky · power law · exponential · linear
- E<sub>a</sub> in eV *and* kJ/mol, with an uncertainty
- Y can be one parameter, Σ all resistances, or a combination you build
- Excluded datasets listed separately from ones that could not contribute
- Refuses to fit a series whose variable does not vary

</td>
<td width="50%" valign="top">

### 🖥️ Real-Time Interactive Simulation

The feature that started it all. Draw an equivalent circuit on the visual canvas, set your parameters, and the **Nyquist, Bode, and Phase plots update instantly** — with your experimental data overlaid.

- Drag-and-drop canvas with grid snapping
- Presets: Randles, Randles+Warburg, CPE variants, inductive loops, battery (FLW), Gerischer
- Double-click a component to see the frequency band it governs
- Drag the influence marker to change a value from the plot
- Circuit notation input/output (`Rs-[Rct/Cdl]-W`)

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 🎯 Advanced Fitting Engine

An **escalating** optimizer: exact, inexpensive methods first — global search engaged only when a fit fails quality acceptance.

1. **Analytic Jacobian** — the circuit's derivative in closed form via adjoint sensitivity
2. **LHS multi-start** — candidates screened before full refinement
3. **TRF** — Trust-Region Reflective for gradient-precise convergence
4. **DE escalation** — triggered only on a rejected fit

$$\chi^2 = \sum_{k} \frac{(Z'_k - \hat{Z}'_k)^2 + (Z''_k - \hat{Z}''_k)^2}{|Z_k|^2}$$

**Search scope** now controls whether your starting values matter: *Global*, *Anchored*, or *Local*. **Fit All Datasets** runs a whole series, each fit seeded from the last.

</td>
<td width="50%" valign="top">

### ⚖️ Model Comparison

Adding a component almost always lowers χ² — that is not evidence it belongs.

Every fit is remembered as a candidate and ranked by an information criterion that charges each parameter against the improvement it buys.

- **AICc** by default (small-sample corrected), or AIC or BIC
- Δ and Akaike weights per candidate
- Any candidate restorable to the canvas
- Models fitted to *different* data are refused, not ranked
- A gap under 2 says so, and recommends the simpler circuit

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 🔬 DRT with Deconvolution

The distribution of relaxation times, plus the means to separate what it merges.

Two processes less than a decade apart become one bump, and the valley split between them is arbitrary — a wrong resistance that does not look wrong, because the total is still right.

- Fits γ(τ) with a sum of R‖CPE peaks, separating by shape
- Drag peaks on the plot; click to add; refit to optimise
- α recovered from peak width via the analytic ZARC DRT
- Straight into a circuit, with fitted α rather than an inferred one
- Honest about limits: R is reliable, α is biased low, the count is a judgement

</td>
<td width="50%" valign="top">

### 📐 Geometry Normalization

An impedance in ohms describes your specimen. Divide out the geometry and you have the **material**.

Eight applications — solid pellets, single cells, membranes, liquid conductivity cells, corrosion and coatings, batteries, in-plane thin films.

- ASR, resistivity, conductivity · i<sub>corr</sub> and mm/yr per ASTM G102
- Conversion follows each quantity's unit, so τ and α are correctly untouched
- Symmetric-cell ÷2 applies to electrodes only, never automatically
- Stored per dataset — a series of pellets each keeps its own
- CPE → effective capacitance by Brug **and** Hsu–Mansfeld

</td>
</tr>
<tr>
<td width="50%" valign="top">

### ✅ Kramers–Kronig Validation

Before fitting any parameters, confirm your data is worth fitting. ZScope reconstructs Z(ω) from a Voigt (RC-ladder) basis that is KK-consistent by construction.

| Residual | Status | Action |
|---|---|---|
| < 0.5% | ✅ Valid | Proceed |
| 0.5–2% | ⚠️ Minor drift | Narrow frequency range |
| > 2% | ❌ Violation | Repeat measurement |

A *systematic* trend in the residuals points to drift or non-stationarity; random scatter is just noise. One keystroke (Ctrl+K), under 2 seconds.

</td>
<td width="50%" valign="top">

### 📊 Bayesian MCMC Uncertainty

A single point estimate is not enough. ZScope uses the `emcee` affine-invariant ensemble sampler to map the full posterior P(θ | Z<sub>exp</sub>):

- **95% credible intervals** — probability-direct
- Noise scale **marginalised analytically**, so intervals account for uncertainty in the noise level itself
- Marginal and joint posteriors, correlation and covariance
- Convergence diagnostics: R̂ (Gelman–Rubin) + autocorrelation time
- Predictive uncertainty bands from 300 posterior draws

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 📥 Flexible Data Import

Import EIS data without fighting file formats. ZScope recognizes the native exports of most common potentiostats — Gamry, BioLogic, Autolab, Zahner, Ivium, CHI, PalmSens, PAR — and falls back to a smart generic parser.

- Batch import: many files at once, columns auto-detected per file
- Paste tabular data straight from a spreadsheet (`Ctrl+V`), locale-aware
- Sign convention toggle for different potentiostats
- Row-level filtering: exclude drift or outliers while keeping them visible
- Series variables read from file names, including unitless patterns

</td>
<td width="50%" valign="top">

### 🔧 Extensible Element Library

| Element | Physical Meaning |
|---|---|
| R, C, L | Resistance, capacitance, inductance |
| CPE | Surface roughness / inhomogeneity |
| W (Warburg) | Semi-infinite diffusion |
| FLW / FSW | Finite diffusion (permeable/blocking) |
| Gerischer | Diffusion + chemical reaction |
| Transmission line | Porous electrode models |
| **Custom** | **Any Z(ω) or Y(ω) expression** |

Custom elements are defined through a GUI designer, exported as `.json`, and behave identically to built-ins — no coding required. Geometry normalization and unit handling follow them automatically.

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 💾 Projects & Session Persistence

**Save Project** writes everything — datasets, circuits, fits, posteriors, DRT results, series variables, geometry, model candidates, import settings — into a single `.zscope` file that reopens exactly as you left it.

- One file per session, or one file per dataset
- Open ZIP container with a readable JSON manifest
- Arrays stored exactly: reload is bit-for-bit identical
- No pickled objects — a project file cannot execute code
- Versioned schema: projects stay readable as ZScope evolves

</td>
<td width="50%" valign="top">

### 🔎 Data Traceability

Every spectrum carries a record of how it entered the analysis — auto-detected columns, a mapping you chose, or values you edited by hand — visible during import, written to the log, and preserved in the project file.

Reports state their own conventions too: the imaginary sign, the geometry a value was normalized by, and which parameters the symmetric-cell factor was applied to. Exports carry all of it, so a CSV opened months later is still unambiguous.

</td>
</tr>
</table>

---

## 🗺️ Recommended Workflow

### One spectrum

```
  Load Data  ──▶  KK Validate  ──▶  Build Circuit  ──▶  Fit  ──▶  MCMC  ──▶  Export
      │                │                  │               │          │           │
  auto-detect      < 2 seconds       real-time sim    LHS+TRF+DE  posterior  txt/csv/
  column format    residual map      overlay data     warm-start   credible   json/PDF
```

### A series

```
  Import batch ──▶ Series Variables ──▶ Fit All ──▶ Series Analysis ──▶ Export
        │                 │                 │              │              │
   many files at    what varied:      seeded from    Arrhenius,      trend + Eₐ
   once, columns    T, E, t, [C]      the previous   Mott–Schottky,  with its
   detected each      per dataset       spectrum      power law       uncertainty
```

1. **Import** — one file, or a whole folder with columns detected per file
2. **Validate** (Ctrl+K) — confirm linearity and stationarity before fitting anything
3. **Build your circuit** — draw it, choose a preset, request an algorithmic suggestion, or derive one from the DRT
4. **Fit** — configure weighting, loss, restarts, search scope and frequency band
5. **Compare models** — is the extra element earning its place?
6. **Quantify uncertainty** — Bayesian MCMC for full posteriors and convergence diagnostics
7. **Normalize** — enter the sample geometry and read ASR, resistivity or conductivity
8. **Analyse the series** — record what varied, fit them all, read the trend
9. **Export** — publication-ready figures, parameter tables, structured reports, and a `.zscope` project preserving the session

---

## 📈 Validation & Benchmarks

ZScope is validated against synthetic data with known ground-truth parameters, across five reference circuits, three noise models, and multiple noise levels — over 19,000 independent fits per full benchmark run. Every figure below is a repeated-trial result with an interval, not a single-seed example.

### Goodness of fit

χ² computed against the **true** per-point noise σ used to generate the data. A correctly-specified model fitted to the noise floor gives 1.0.

| Noise level | χ²<sub>calibrated</sub> |
|---|:---:|
| 2% | **0.992** |
| 5% | **1.006** |

### Parameter recovery — blind start, 2% noise

Optimizer started from an uninformed guess (0.2×–5× per parameter), not from the true values.

| Circuit | Worst parameter | Mean error |
|---|---|:---:|
| Randles | C<sub>dl</sub> | 0.36% |
| Randles + Warburg | σ<sub>W</sub> | 0.54% |
| CPE Randles | Q | 1.79% |
| Two-Time-Constants | C₂ | 3.98% |

All other parameters recover below 1%. The CPE exponent α recovers to 0.25%.

### Confidence-interval coverage

Whether the reported ± actually contains the true value at its nominal rate — measured, not assumed.

| Condition | Covariance estimator | Coverage (nominal 95%) |
|---|---|:---:|
| Well-behaved noise | Jacobian | 94.4% |
| Well-behaved noise | Robust sandwich | 93.1% |
| 5% contaminated points | Jacobian | 89.0% |
| 5% contaminated points | **Robust sandwich** | **94.2%** |

The robust loss is the shipped default: it costs about a point of efficiency on clean data and recovers calibration entirely when data contains outliers.

### DRT resolution limit

How far apart two relaxation processes must be before the DRT resolves them as two peaks rather than one — the Rayleigh criterion analogue for impedance.

| Noise | Required τ₂/τ₁ |
|---|:---:|
| 0% | ≈ 10 |
| 1% | ≈ 16 |
| 2% | ≈ 27 |
| 5% | ≈ 75 |

Approximately **τ₂/τ₁ ≈ 15 × (noise level in %)**. Below the limit the method fails conservatively — returning a single peak at the geometric mean with the combined resistance, rather than inventing structure. Version 3.0's deconvolution can separate peaks below this limit *when you tell it how many there are*, which is why it reports the peak count as a judgement rather than a result.

> Where ZScope's methods have limits, the benchmarks report them. Kramers–Kronig testing reliably detects drift only once the distortion is large relative to measurement noise — a small drift is genuinely indistinguishable from noise, in any implementation. The Q–α correlation in CPE fitting reflects a real physical interdependence, not a software deficiency, and is detected and reported rather than hidden.

All benchmark data, comparison tables, and analysis scripts are available in [`benchmarks/`](https://github.com/Tecush/ZScope/tree/main/benchmarks) for independent verification.

---

## 🔭 Scientific Applications

| Domain | Typical Use | Series analysis gives you |
|---|---|---|
| **Solid-State & Ceramics** | Grain and grain-boundary separation · electrolyte conductivity | Activation energy from a temperature sweep |
| **Battery Science** | SEI/CEI characterization · charge-transfer kinetics · Li-ion diffusion | R<sub>ct</sub> growth against cycle number or SoC |
| **Photovoltaics** | Recombination dynamics · ion migration · hysteresis | Trends against bias or illumination |
| **Corrosion Science** | Polarization resistance · coating integrity · inhibitor screening | R<sub>p</sub> and penetration rate against immersion time |
| **Fuel Cells & Electrolyzers** | Ohmic · kinetic · mass-transport deconvolution | Reaction order from a pO₂ or current-density series |
| **Supercapacitors** | Double-layer behaviour · porous electrode transmission-line analysis | Specific capacitance against mass or area |
| **Semiconductors & Passive Films** | Space-charge capacitance | Flat-band potential and dopant density (Mott–Schottky) |
| **Bioelectrochemistry** | Redox probe kinetics · biosensor interfacial impedance | Calibration curve against concentration |
| **Mechanistic Studies** | Multi-state or time-series EIS — the exact scenario ZScope was designed for | The whole point |

---

## 🆚 Why ZScope?

| Capability | Commercial Tools | Academic Scripts | **ZScope** |
|---|:---:|:---:|:---:|
| Real-time interactive simulation | Rarely | ✗ | ✅ Instantaneous |
| **Series analysis (Arrhenius, Mott–Schottky, …)** | ✗ | Manual | ✅ **Built in, with uncertainties** |
| **Sequential batch fitting of a whole series** | Rarely | Manual | ✅ **One pass, seeded** |
| **Model comparison by AICc / AIC / BIC** | ✗ | Manual | ✅ **Ranked, with weights** |
| **DRT peak deconvolution** | ✗ | Rarely | ✅ **Interactive, on the plot** |
| **Geometry normalization (ASR, σ, i<sub>corr</sub>)** | Rarely | Manual | ✅ **Eight applications** |
| Bayesian MCMC posteriors | Rarely | Manual | ✅ Full `emcee` engine |
| Kramers–Kronig validation | Limited | Manual | ✅ Integrated + residual maps |
| Global optimization (LHS+TRF+DE) | ✗ Local only | Variable | ✅ Escalating hybrid |
| Algorithmic circuit suggestion | Uncommon | ✗ | ✅ Spectral fingerprinting + DRT-derived |
| Custom elements (no coding) | Restricted | Script-level | ✅ GUI designer |
| Batch import of many spectra | Partial | Manual | ✅ Auto-detected per file |
| Paste data from clipboard | ✗ | ✗ | ✅ Locale-aware |
| Single-file session projects | Rarely | ✗ | ✅ Open, inspectable format |
| Published coverage & resolution limits | ✗ | ✗ | ✅ Measured and documented |
| Structured export (txt/csv/json/PDF) | Partial | Manual | ✅ Full |
| Cost | 💰 Annual license | Free | ✅ **Free** |

---

## 💾 Installation

### Windows — Standalone Installer

**[⬇ Download Latest Release](https://github.com/Tecush/ZScope/releases/latest)**

No Python. No package manager. No dependencies. Download, run the installer, open ZScope.

Projects and settings from 2.x open unchanged in 3.0.

> macOS and Linux support are planned. If you work on those platforms, please [open an issue](https://github.com/Tecush/ZScope/issues) — user demand shapes the roadmap.

---

## 📖 Citation

If ZScope contributes to published research, please cite it so others can find it:

```bibtex
@software{zscope2026,
  author  = {Mohammadi, Tecush},
  title   = {ZScope: Publication-Grade Electrochemical Impedance Spectroscopy Analysis Platform},
  year    = {2026},
  version = {3.0.0},
  url     = {https://github.com/Tecush/ZScope},
  doi     = {10.5281/zenodo.20357547}
}
```

DOI: [10.5281/zenodo.20357547](https://doi.org/10.5281/zenodo.20357547) — this DOI refers to ZScope as a whole and stays the same across releases.

---

## 📬 Contact

**Developer:** Tecush Mohammadi
**Email:** [tecush@gmail.com](mailto:tecush@gmail.com)
**GitHub:** [@Tecush](https://github.com/Tecush)
**Issues & feature requests:** [GitHub Issues](https://github.com/Tecush/ZScope/issues)

Questions about scientific methods, specific use cases, or validation data are welcome by email.

---

<div align="center">

  *Built from a real experiment, for real researchers.*
  *Because good science deserves better tools.*

  <br/>

  <a href="https://github.com/Tecush/ZScope/releases/latest"><img src="https://img.shields.io/github/v/release/Tecush/ZScope?label=Download%20ZScope&style=for-the-badge&color=1d6fb5" alt="Download"/></a>

</div>
