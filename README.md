![ZScope Banner](https://raw.githubusercontent.com/Tecush/ZScope/main/images/splash.png)

<div align="center">
  <img width="72" height="72" alt="ZScope Icon" src="https://github.com/user-attachments/assets/c23f0756-3dc3-46ac-a2b2-4c69e630ff50" />

  <h1>ZScope</h1>

  <p><strong>Publication-Grade Electrochemical Impedance Spectroscopy Analysis Platform</strong></p>

  <p>
    <a href="#the-story-behind-zscope">Story</a> •
    <a href="#what-zscope-does">Features</a> •
    <a href="#recommended-workflow">Workflow</a> •
    <a href="#validation--benchmarks">Benchmarks</a> •
    <a href="#scientific-applications">Applications</a> •
    <a href="#installation">Installation</a> •
    <a href="#citation">Citation</a> •
    <a href="#contact">Contact</a>
  </p>

  <p>
    <a href="https://github.com/Tecush/ZScope/releases/latest"><img src="https://img.shields.io/github/v/release/Tecush/ZScope?label=Release&color=blue" alt="Latest Release"/></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green" alt="License"/></a>
    <a href="https://github.com/Tecush/ZScope/issues"><img src="https://img.shields.io/github/issues/Tecush/ZScope" alt="Issues"/></a>
  </p>
</div>

---

## The Story Behind ZScope

ZScope was not designed in the abstract. It was born out of a real experimental frustration.

During an electrochemical study of a reaction process, I needed to measure a baseline EIS spectrum at the start of the experiment, and then capture six additional spectra at different oxidation states as the reaction progressed. Each spectrum represented a distinct state of the system — different kinetics, different interfacial conditions, different time constants. Together, they told the story of a mechanism evolving in time.

The problem came during analysis. Working through seven spectra individually with existing tools was slow and disjointed. Adjusting parameters in one fit gave no intuitive sense of how those same parameters changed across the series. There was no way to interactively explore the relationship between circuit component values and the shape of the impedance plot — to build the physical intuition that makes EIS more than just curve-fitting.

I found myself thinking: *what if I could design my own equivalent circuit, adjust its parameters live, and watch the simulated spectrum respond in real time — overlaid directly on my experimental data?* Not as a fitting tool, but as a way to understand what I was looking at. A way to arrive at a physically motivated starting point before handing off to a numerical optimizer.

That idea became the first version of ZScope: a real-time EIS simulator with an interactive circuit canvas. You draw your circuit, move a slider, and the Nyquist plot updates instantly. It proved to be an invaluable aid for mechanism understanding and for generating reliable initial parameter estimates.

But as the tool took shape, it became clear it could be more. The fitting engine followed — built with the same insistence on reliability and physical transparency. Then Bayesian uncertainty quantification, because a parameter value without an honest uncertainty estimate is of limited scientific value. Then data validation, custom components, structured reporting.

ZScope is the tool I needed during that experiment. I am sharing it freely, in the hope that it saves other researchers the same frustration — and gives them something better in its place.

> **A note on distribution:** ZScope is released as a ready-to-install application. Source code is not publicly distributed. The scientific methods, validation benchmarks, and full help documentation are provided so you can trust what is happening inside.

---

## What ZScope Does

ZScope covers the complete EIS analytical workflow in a single desktop application — no programming required, no subscriptions, no external dependencies.

### 1. Real-Time Interactive Circuit Simulation

This is where ZScope started, and it remains its most distinctive feature.

Draw an equivalent circuit on the visual canvas, set your component parameters, and the Nyquist, Bode magnitude, and Bode phase plots update **instantaneously**. Load your experimental data alongside and you can overlay the simulation directly — adjusting R_ct, CPE exponent, or Warburg coefficient by hand and watching the model track your data in real time.

This is not just convenient. It builds physical intuition that no black-box fitter can provide. When you see a depressed semicircle flatten as you lower the CPE α, or a 45° Warburg tail emerge as you add a diffusion element, the connection between circuit topology and electrochemical mechanism becomes tangible.

- Drag-and-drop construction of arbitrary topologies on a live, grid-snapping canvas
- Right-click or toolbar component placement; labels auto-increment and recycle on deletion
- Nested sub-circuits and hierarchical models fully supported
- Circuit notation input/output in standard series (`-`) and parallel (`[A/B]`) syntax, parsed via biconnected component decomposition (Tarjan's algorithm) for mathematically exact representation
- Preset library: Randles, Randles + Warburg, CPE Randles, inductive loop, battery (FLW), Gerischer diffusion, and more
- **Save your own circuits** to a personal library for reuse across experiments

### 2. Flexible & Powerful Experimental Data Import

Importing EIS data should not be a battle with file formats.

ZScope reads tabular data files and automatically detects column assignments, cross-verifies Re/Im against Mag/Phase representations (flagging inconsistencies > 1%), and handles sign convention differences between potentiostat brands. You retain full control: filter individual rows, set start/end data windows, restrict the fitting frequency band, and see exactly which points will be included in the analysis before running a single calculation.

- Auto-detection and validation of Re/Im vs Mag/Phase column pairs
- Sign convention toggle for potentiostats that export positive Z''
- Row-level checkbox filtering: exclude low-frequency drift, high-frequency cable artefacts, or transient outliers while keeping them visible for reference
- Frequency sub-band fitting (`f_lo` / `f_hi`) to focus optimization on reliable spectral regions

### 3. Kramers–Kronig Data Validation

Before fitting any parameters, you should know whether your data is worth fitting.

The Kramers–Kronig relations are a necessary condition for valid EIS: if your data violates them, fitted parameters may be mathematically plausible but physically meaningless. ZScope implements the linear KK test with quantitative residual mapping and a clear, actionable verdict.

| Residual Level | Interpretation | Recommended Action |
|---|---|---|
| < 0.5% | Data is linear, causal, and stationary | Proceed with fitting |
| 0.5 – 2% | Minor drift or noise present | Consider narrowing the fitting frequency range |
| > 2% | Non-stationarity or systematic artefacts | Improve measurement conditions; repeat |

- One-click validation (Ctrl+K) with < 2-second response
- Frequency-resolved residual map to pinpoint exactly which spectral regions are problematic
- KK-aware circuit proposal filtering: algorithmically suggested circuits are flagged when data quality is insufficient

### 4. Advanced Parameter Fitting Engine

When you are ready to move from visual exploration to quantitative fitting, ZScope applies a rigorous multi-stage optimization strategy designed to find the global minimum reliably — not just the nearest local one.

**Stage 1 — Latin Hypercube Sampling (LHS):** Parameter space is partitioned into non-overlapping strata and sampled exactly once per stratum. This guarantees broad, space-filling coverage with fewer starting points than random restarts, avoiding the clustering that plagues naive multi-start approaches.

**Stage 2 — Differential Evolution (DE):** For complex circuits with multimodal χ² landscapes (overlapping time constants, nested diffusion loops), a population-based global search evolves candidates via mutation and crossover before local refinement.

**Stage 3 — Trust-Region Reflective (TRF):** Gradient-based local refinement polishes the best candidate to numerical precision within physical parameter bounds.

The objective function uses **modulus weighting** (Boukamp, 1986) by default, equalizing the relative contribution of each frequency point across the full impedance range:

$$\chi^2 = \sum_{k} \frac{(Z'_k - \hat{Z}'_k)^2 + (Z''_k - \hat{Z}''_k)^2}{|Z_k|^2}$$

Additional controls give you full command over the fitting process:

- **Weighting schemes:** modulus (default), proportional, or unit — with scientific rationale provided in the built-in help
- **Robust loss (Soft-L1 / Pseudo-Huber):** transitions from L2 for small residuals to linear growth for large ones, downweighting artefacts without discarding them
- **Warm-start for sequential measurements:** when running a series of EIS at different states (as ZScope was originally designed for), the previous accepted fit is carried forward automatically when topology and frequency overlap are sufficient — reducing computation time by 60–80%
- **AIC and BIC model selection:** penalize unnecessary complexity; ΔAIC > 10 provides strong evidence for the simpler model

### 5. Bayesian MCMC Uncertainty Quantification

A single point estimate is not enough. Parameter correlations, non-identifiability, and non-linear response surfaces mean that the true uncertainty of EIS parameters is rarely captured by a Jacobian-based confidence interval.

ZScope's Bayesian engine samples the full posterior probability distribution P(θ | Z_exp) using the `emcee` affine-invariant ensemble sampler:

1. **MAP initialization:** A fast TRF fit seeds walkers in a tight Gaussian ball around the maximum a posteriori estimate, dramatically reducing burn-in
2. **Adaptive σ calibration:** Residuals at MAP set heteroscedastic noise floors per frequency: σᵢ = max(rms, 0.5% · |Z_exp,i|)
3. **Stretch-move sampling:** Walkers explore parameter space by stretching against each other — no gradients required, invariant to parameter scaling

The result is a complete picture of parameter uncertainty:

- Marginal and joint posterior distributions
- **95% credible intervals** — direct probability statements ("there is a 95% probability the true parameter lies here"), not the frequentist approximations of classical confidence intervals
- Parameter correlation matrix and covariance analysis
- Convergence diagnostics: autocorrelation time ratio (N/50τ ≥ 1.0), Gelman–Rubin statistic (R̂ < 1.1), acceptance rate (target 0.20–0.50)
- **Posterior predictive uncertainty bands:** shaded regions on Nyquist and Bode plots derived from 300 random posterior draws — wide bands reveal frequencies where the data cannot constrain the model

### 6. Algorithmic Circuit Proposal

Not sure which circuit to use? ZScope can suggest one.

The engine extracts a mathematical fingerprint from your raw Z(ω): arc count and depression angles (via Savitzky-Golay peak finding), low-frequency log-log slope (classifying Warburg, Gerischer, FLW, FSW, or blocking behavior), and inductive loop detection. It then scores candidate topologies against the fingerprint, penalized by parameter count to guard against over-fitting:

$$\text{Score}_\text{adj} = \text{RawMatch} - \lambda \cdot \frac{N_\text{params}}{N_\text{features}}$$

Top suggestions come with physically motivated initial parameter bounds derived directly from spectral features — R_s ≈ Z'_hf, σ ≈ R_ct / √(2π f_onset) — giving the optimizer the best possible starting point.

### 7. Custom & Extensible Component Library

ZScope ships with a comprehensive built-in element library. When your system requires something it does not cover, you can define it yourself — through a graphical interface, without touching source code.

**Built-in elements:**

| Element | Physical Process |
|---|---|
| R, C, L | Solution resistance, ideal capacitance, inductance |
| CPE | Surface inhomogeneity, roughness, porosity (Z = 1 / Q(jω)^α) |
| W — Warburg | Semi-infinite linear diffusion |
| FLW — Finite-Length Warburg | Finite diffusion, permeable boundary (membranes, porous electrodes) |
| FSW — Finite-Space Warburg | Finite diffusion, blocking boundary (thin films, dead-end pores) |
| G — Gerischer | Diffusion coupled to homogeneous chemical reaction |
| Transmission line | Porous electrode and Bisquert models |

**Custom element designer:**
- Define any Z(ω) or Y(ω) as a mathematical expression using standard functions and your own parameter keys
- Sandbox testing at sample frequencies before registration
- Built-in vector symbol editor: draw how your element looks on the canvas
- Export to `.json` for sharing with colleagues; import from `.json` to load community-defined elements
- Registered custom elements behave identically to built-ins: they appear in the toolbar, accept slider control, participate fully in fitting with proper bounds and log/linear scaling, and are included in AIC/BIC calculations

### 8. Fit Results & Publication-Ready Reporting

After fitting, ZScope presents a complete, structured account of the results:

- Full parameter table with confidence or credible intervals and relative uncertainties
- Fit quality metrics: χ², χ²_red, RMSE, R² (magnitude and phase separately), AIC, BIC
- Frequency-resolved residual plot with systematic pattern diagnostics
- Parameter correlation matrix with high-correlation warnings (|r| > 0.95)
- Export in `.txt`, `.csv`, or `.json` for downstream analysis
- High-resolution figure export: PNG at 1920×1080, SVG, and PDF
- Full HTML/PDF analysis reports suitable for supplementary materials and archival

---

## Recommended Workflow

```
Load Data  →  KK Validation  →  Build / Select Circuit  →  Fit  →  Bayesian MCMC  →  Export
```

1. **Import your data** — ZScope detects column format, validates consistency, and lets you filter rows and set frequency bounds before touching a parameter
2. **Validate with KK** (Ctrl+K) — Confirm linearity, causality, and stationarity; investigate any flagged frequency regions before proceeding
3. **Construct your circuit** — Draw on the visual canvas, select a preset, type a notation string, or request an algorithmic suggestion; use real-time simulation to visually match the model to your data
4. **Run the optimizer** — Configure weighting, loss function, restarts, and frequency band; the DE+LHS+TRF engine finds reliable parameter estimates with comprehensive diagnostics
5. **Quantify uncertainty** — Run Bayesian MCMC to obtain full posterior distributions, credible intervals, and convergence verification
6. **Export** — Generate publication-ready figures, parameter tables, and structured reports in your preferred format

---

## Validation & Benchmarks

ZScope's fitting engine was rigorously validated on synthetic data with known ground-truth parameters. Four standard circuits were evaluated at three noise levels — 0%, 2%, and 5% Gaussian noise — to characterize both accuracy and robustness:

| Circuit | Noise | Result |
|---|---|---|
| Randles | 0% | Relative error < 10⁻¹² % — machine-precision recovery |
| Randles + Warburg | 2% | Overall RMSE 1.68–1.74%; max individual parameter error 1.22% |
| CPE Randles | 5% | Robust recovery within noise level; expected Q–α correlation flagged |
| Two-Time-Constants | 5% | Robust recovery within noise level |

The expected Q–α correlation in the CPE case is not a deficiency — it reflects a genuine physical interdependence in CPE parameterization, and ZScope correctly identifies and reports it.

All benchmark circuits, raw synthetic data, ground-truth comparison tables, and analysis scripts are available in the [`benchmarks/`](https://github.com/Tecush/ZScope/tree/main/benchmarks) directory for independent verification.

---

## Scientific Applications

ZScope is applicable across the full breadth of EIS-based research:

**Battery Science & Energy Storage** — SEI/CEI formation and growth, charge-transfer kinetics, lithium-ion and sodium-ion diffusion, degradation pathway identification, and state-of-health monitoring in Li-ion, Na-ion, and all-solid-state battery systems.

**Photovoltaics & Perovskite Solar Cells** — Recombination dynamics, ion migration, hysteresis characterization, capacitance spectroscopy, and interfacial charge accumulation analysis.

**Corrosion Science & Surface Protection** — Quantification of polarization resistance, coating delamination detection, pore resistance, and diffusion-controlled corrosion kinetics for inhibitor screening and coating lifetime prediction.

**Fuel Cells & Electrolyzers** — Deconvolution of ohmic, charge-transfer, and mass-transport contributions in PEM, AEM, and solid-oxide electrochemical systems.

**Supercapacitors & Pseudocapacitive Materials** — Double-layer behavior, faradaic pseudocapacitance contributions, and porous electrode transmission-line modeling.

**Bioelectrochemistry & Sensors** — Redox probe kinetics at modified electrodes, biomolecular binding event detection, and biointerface impedance characterization.

**Mechanistic Studies Across Oxidation States** — The sequential measurement scenario that motivated ZScope: characterizing a system at multiple states or time points, with real-time visual comparison to track how parameters evolve across conditions.

---

## Why ZScope?

| Capability | Commercial Tools | Academic Scripts | **ZScope** |
|---|---|---|---|
| Real-time visual simulation | Sometimes | Rarely | Instantaneous — the core of the tool |
| Bayesian uncertainty quantification | Rarely available | Manual effort | Full MCMC posterior + credible intervals |
| Kramers–Kronig validation | Limited | Manual | Integrated with frequency-resolved residuals |
| Global optimization | Local solvers only | Variable | DE + LHS + TRF — reliable global search |
| Algorithmic circuit suggestion | Uncommon | Not available | Physics-driven spectral fingerprinting |
| Custom impedance elements | Restricted | Script-level | GUI-based designer — no coding required |
| Sequential / warm-start fitting | Rarely | Manual | Automatic — 60–80% speed gain on series data |
| Comprehensive fit reporting | Partial | Manual | Full export: txt, csv, json, PDF, HTML |
| Reproducibility & transparency | Often opaque | High | Complete documentation + open benchmarks |
| Cost | High annual license | Free | **Completely free** |

---

## Installation

### Windows

Download the latest standalone installer from the [Releases page](https://github.com/Tecush/ZScope/releases/latest).

No Python installation, no package manager, no dependencies. Download, install, and open. ZScope is distributed as a fully self-contained application.

> macOS and Linux support are planned for future releases. If you work on these platforms and would find ZScope useful, please open an issue — demand helps prioritize development.

---

## Citation

If ZScope contributes to published research, please cite it so others in the community can find it:

```bibtex
@software{zscope2026,
  author  = {Mohammadi, Tecush},
  title   = {ZScope: Publication-Grade Electrochemical Impedance Spectroscopy Analysis Platform},
  year    = {2026},
  url     = {https://github.com/Tecush/ZScope}
}
```

---

## Contact

| | |
|---|---|
| **Developer** | Tecush Mohammadi |
| **Email** | tecush@gmail.com |
| **GitHub** | [@Tecush](https://github.com/Tecush) |
| **Bug reports & feature requests** | [GitHub Issues](https://github.com/Tecush/ZScope/issues) |

Questions about the scientific methods, validation data, or specific use cases are welcome by email.

---

<div align="center">
  <sub>Built from a real experiment, for real researchers — because good science deserves better tools.</sub>
</div>
