![ZScope Banner](https://raw.githubusercontent.com/Tecush/ZScope/main/images/splash.png)

<div align="center">
  <img width="80" height="80" alt="ZScope Icon" src="https://github.com/user-attachments/assets/c23f0756-3dc3-46ac-a2b2-4c69e630ff50" />

  <h1>ZScope</h1>

  <p><em>Publication-Grade Electrochemical Impedance Spectroscopy Platform</em></p>

  <p>
    <a href="https://github.com/Tecush/ZScope/releases/latest"><img src="https://img.shields.io/github/v/release/Tecush/ZScope?label=Latest%20Release&style=flat-square&color=1d6fb5" alt="Latest Release"/></a>&nbsp;
    <a href="https://doi.org/10.5281/zenodo.21827740"><img src="https://zenodo.org/badge/DOI/10.5281/zenodo.21827740.svg" alt="DOI"/></a>&nbsp;
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-22c55e?style=flat-square" alt="MIT License"/></a>&nbsp;
    <a href="https://github.com/Tecush/ZScope/issues"><img src="https://img.shields.io/github/issues/Tecush/ZScope?style=flat-square&color=f59e0b" alt="Open Issues"/></a>&nbsp;
    <img src="https://img.shields.io/badge/Platform-Windows-0ea5e9?style=flat-square" alt="Windows"/>&nbsp;
    <img src="https://img.shields.io/badge/No%20Python%20Required-✓-22c55e?style=flat-square" alt="Standalone"/>
  </p>

  <p>
    <a href="#-the-story-behind-zscope">Story</a> ·
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

ZScope is the tool I needed during that experiment. It is free, and I hope it gives other researchers something better than what was available to me.

> **Distribution:** ZScope is released as a ready-to-install application for Windows. Source code is not publicly distributed. Full scientific documentation, validation benchmarks, and an in-app help manual are provided so you can trust what happens inside.

---

## ⚡ Key Capabilities

<table>
<tr>
<td width="50%" valign="top">

### 🖥️ Real-Time Interactive Simulation

The feature that started it all. Draw an equivalent circuit on the visual canvas, set your parameters, and the **Nyquist, Bode, and Phase plots update instantly** — with your experimental data overlaid.

Adjusting R<sub>ct</sub>, CPE exponent, or Warburg coefficient by hand and watching the spectrum respond builds the kind of physical intuition no black-box fitter can provide.

- Drag-and-drop canvas with grid snapping
- Presets: Randles, Randles+Warburg, CPE variants, inductive loops, battery (FLW), Gerischer
- Save your own circuits to a personal library
- Circuit notation input/output (`Rs-[Rct/Cdl]-W`)

</td>
<td width="50%" valign="top">

### 📥 Flexible Data Import

Import EIS data without fighting file formats. ZScope recognizes the native export formats of most common potentiostats — Gamry, BioLogic, Autolab, Zahner, Ivium, CHI, PalmSens, PAR, and more — and falls back to a smart generic parser for anything else.

- Auto-detection and consistency cross-check of column pairs
- Sign convention toggle for different potentiostats
- Row-level filtering: exclude drift, artefacts, or outliers while keeping them visible
- Frequency sub-band restriction for fitting

</td>
</tr>
<tr>
<td width="50%" valign="top">

### ✅ Kramers–Kronig Validation

Before fitting any parameters, confirm your data is worth fitting. ZScope implements the linear KK test (Boukamp's lin-KK method) with quantitative, modulus-weighted residual mapping.

| Residual | Status | Action |
|---|---|---|
| < 0.5% | ✅ Valid | Proceed |
| 0.5–2% | ⚠️ Minor drift | Narrow frequency range |
| > 2% | ❌ Violation | Repeat measurement |

One keystroke (Ctrl+K), under 2 seconds.

</td>
<td width="50%" valign="top">

### 🎯 Advanced Fitting Engine

A three-stage hybrid optimizer designed to find the true global minimum, not just the nearest local one:

1. **LHS** — Latin Hypercube Sampling for space-filling parameter coverage
2. **DE** — Differential Evolution for multimodal landscapes
3. **TRF** — Trust-Region Reflective for gradient-precise local refinement

$$\chi^2 = \sum_{k} \frac{(Z'_k - \hat{Z}'_k)^2 + (Z''_k - \hat{Z}''_k)^2}{|Z_k|^2}$$

Modulus weighting · Soft-L1 robust loss · AIC/BIC model selection · Warm-start for series measurements (60–80% speed gain)

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 📊 Bayesian MCMC Uncertainty

A single point estimate is not enough. ZScope uses the `emcee` affine-invariant ensemble sampler to map the full posterior distribution P(θ | Z<sub>exp</sub>):

- **95% credible intervals** — probability-direct, not frequentist approximations
- Marginal and joint posterior distributions
- Parameter correlation and covariance analysis
- Convergence diagnostics: R̂ (Gelman–Rubin) + autocorrelation time
- Predictive uncertainty bands from 300 posterior draws

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

Custom elements are defined through a GUI designer, exported as `.json`, and behave identically to built-ins in all fitting and simulation contexts — no coding required.

</td>
</tr>
</table>

---

## 🗺️ Recommended Workflow

```
  Load Data  ──▶  KK Validate  ──▶  Build Circuit  ──▶  Fit  ──▶  MCMC  ──▶  Export
      │                │                  │               │          │           │
  auto-detect      < 2 seconds       real-time sim    DE+LHS+TRF  posterior  txt/csv/
  column format    residual map      overlay data     warm-start   credible   json/PDF
```

1. **Import** — ZScope detects column format, cross-validates consistency, and lets you filter rows before any calculation
2. **Validate** (Ctrl+K) — Confirm linearity and stationarity; investigate flagged frequency regions
3. **Build your circuit** — Draw on canvas, choose a preset, or request an algorithmic suggestion based on spectral fingerprinting
4. **Fit** — Configure weighting, loss function, restarts, and frequency band; run the optimizer
5. **Quantify uncertainty** — Run Bayesian MCMC for full posteriors, credible intervals, and convergence diagnostics
6. **Export** — Publication-ready figures (PNG/SVG/PDF), parameter tables, and structured reports

---

## 📈 Validation & Benchmarks

Validated on synthetic data with known ground-truth parameters: four circuits × three noise levels, twelve test cases, all converging successfully.

| Circuit | Noise | Accuracy |
|---|:---:|---|
| Randles | 0% | Relative error **< 10⁻¹² %** — machine precision |
| Randles + Warburg | 2% | RMSE 1.68–1.74% · max individual error **1.22%** |
| CPE Randles | 5% | Recovery within noise level · Q–α correlation correctly identified |
| Two-Time-Constants | 5% | Recovery within noise level |

> The Q–α correlation in the CPE case is not a software deficiency — it reflects a genuine physical interdependence in CPE parameterization. ZScope correctly detects and reports it.

All benchmark data, comparison tables, and analysis scripts are available in [`benchmarks/`](https://github.com/Tecush/ZScope/tree/main/benchmarks) for independent verification.

---

## 🔭 Scientific Applications

| Domain | Typical Use |
|---|---|
| **Battery Science** | SEI/CEI characterization · charge-transfer kinetics · Li-ion diffusion · state-of-health monitoring |
| **Photovoltaics** | Recombination dynamics · ion migration · hysteresis · capacitance spectroscopy |
| **Corrosion Science** | Polarization resistance · coating integrity · inhibitor screening · lifetime prediction |
| **Fuel Cells & Electrolyzers** | Ohmic · kinetic · mass-transport deconvolution in PEM, AEM, and solid-oxide systems |
| **Supercapacitors** | Double-layer behaviour · faradaic contributions · porous electrode transmission-line analysis |
| **Bioelectrochemistry** | Redox probe kinetics · biosensor interfacial impedance · biomolecular binding |
| **Mechanistic Studies** | Multi-state or time-series EIS — the exact scenario ZScope was designed for |

---

## 🆚 Why ZScope?

| Capability | Commercial Tools | Academic Scripts | **ZScope** |
|---|:---:|:---:|:---:|
| Real-time interactive simulation | Rarely | ✗ | ✅ Instantaneous |
| Bayesian MCMC posteriors | Rarely | Manual | ✅ Full `emcee` engine |
| Kramers–Kronig validation | Limited | Manual | ✅ Integrated + residual maps |
| Global optimization (DE+LHS) | ✗ Local only | Variable | ✅ Three-stage hybrid |
| Algorithmic circuit suggestion | Uncommon | ✗ | ✅ Spectral fingerprinting |
| Custom elements (no coding) | Restricted | Script-level | ✅ GUI designer |
| Sequential warm-start fitting | Rarely | Manual | ✅ Automatic |
| Structured export (txt/csv/json/PDF) | Partial | Manual | ✅ Full |
| Cost | 💰 Annual license | Free | ✅ **Free** |

---

## 💾 Installation

### Windows — Standalone Installer

**[⬇ Download Latest Release](https://github.com/Tecush/ZScope/releases/latest)**

No Python. No package manager. No dependencies. Download, run the installer, open ZScope.

> macOS and Linux support are planned. If you work on those platforms, please [open an issue](https://github.com/Tecush/ZScope/issues) — user demand shapes the roadmap.

---

## 📖 Citation

If ZScope contributes to published research, please cite it so others can find it:

```bibtex
@software{zscope2026,
  author  = {Mohammadi, Tecush},
  title   = {ZScope: Publication-Grade Electrochemical Impedance Spectroscopy Analysis Platform},
  year    = {2026},
  version = {2.0.0},
  url     = {https://github.com/Tecush/ZScope},
  doi     = {10.5281/zenodo.21827740}
}
```

DOI: [10.5281/zenodo.21827740](https://doi.org/10.5281/zenodo.21827740)

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
