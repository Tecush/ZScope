![ZScope Banner](https://raw.githubusercontent.com/Tecush/ZScope/main/images/splash.png)

<div align="center">
  <img width="72" height="72" alt="ZScope Icon" src="https://github.com/user-attachments/assets/c23f0756-3dc3-46ac-a2b2-4c69e630ff50" />
  <h1>ZScope</h1>
  <p><strong>Publication-Grade Electrochemical Impedance Spectroscopy (EIS) Analysis Platform</strong></p>

  <p>
    <a href="#features">Features</a> • 
    <a href="#benchmarks">Benchmarks</a> • 
    <a href="#applications">Applications</a> • 
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

## Overview

**ZScope** is an open-source, desktop-based scientific platform developed for advanced, reproducible, and statistically rigorous analysis of Electrochemical Impedance Spectroscopy (EIS) data. 

Electrochemical Impedance Spectroscopy is one of the most powerful and widely used techniques in electrochemistry, materials science, and energy research. It provides rich information about charge transfer kinetics, mass transport, double-layer properties, corrosion mechanisms, and interfacial phenomena across a broad frequency range. However, extracting physically meaningful parameters from EIS spectra is notoriously challenging due to noise, non-stationarity, parameter correlations, and model ambiguity.

ZScope was built to address these limitations by combining:
- Interactive equivalent circuit modeling
- Robust global + local optimization
- Bayesian uncertainty quantification
- Model-independent data validation
- High-performance numerical computation
- Publication-ready reporting

All integrated into a modern, user-friendly desktop application.

> **Scientific Philosophy**: ZScope rejects the "black-box" approach common in many commercial EIS tools. Every step — from Kramers–Kronig validation to posterior sampling — is designed to promote transparency, reproducibility, and physical interpretability of results. The software aims to elevate EIS analysis from empirical fitting to a rigorous scientific workflow suitable for high-impact research and peer-reviewed publications.

---

## Core Features

### 1. Interactive Visual Circuit Editor
- Drag-and-drop construction of arbitrary circuit topologies
- Real-time simulation of Nyquist, Bode (magnitude & phase), and residual plots
- Support for nested sub-circuits and hierarchical models
- User-defined custom impedance elements via mathematical expressions
- Circuit library system for saving and reusing common models

### 2. Advanced Parameter Fitting Engine
- Hybrid **Differential Evolution (DE) + Trust-Region Reflective (TRF)** optimizer
- Latin Hypercube Sampling (LHS) multi-start strategy to avoid local minima
- Modulus-weighted χ² objective function:  
  $$\chi^2 = \sum_{k} \frac{(Z'_k - \hat{Z}'_k)^2 + (Z''_k - \hat{Z}''_k)^2}{|Z_k|^2}$$
- Soft-L1 robust loss for tolerance to outliers
- Automatic model selection using AIC and BIC criteria
- Comprehensive residual diagnostics and sensitivity analysis

### 3. Bayesian MCMC Uncertainty Quantification
- Full posterior inference using the `emcee` affine-invariant ensemble sampler
- Marginal and joint posterior distributions
- 95% credible intervals (not just confidence intervals)
- Parameter correlation and covariance analysis
- Convergence diagnostics (autocorrelation times, Gelman–Rubin statistic)
- Predictive uncertainty bands on impedance spectra

### 4. Kramers–Kronig Validation Suite
- Linear Kramers–Kronig (lin-KK) test implementation
- Quantitative assessment of causality, linearity, and stationarity
- Residual mapping to identify frequency ranges with violations
- Essential quality gate before any parametric fitting

### 5. High-Performance Computational Core
- Fully vectorized NumPy-based impedance solver
- Sub-millisecond evaluation even for complex multi-element circuits
- Comprehensive element library:
  - R, C, L
  - Constant Phase Element (CPE)
  - Warburg (infinite), Finite-Length Warburg (FLW), Finite-Space Warburg (FSW)
  - Gerischer impedance
  - Transmission line and porous electrode models
  - Bisquert elements
  - Arbitrary user-defined expressions

### 6. Publication-Grade Output
- Professional parameter tables with credible intervals
- Statistical metrics: χ², χ²_red, RMSE, AIC, BIC
- High-resolution exportable figures (PNG, SVG, PDF)
- Complete HTML/PDF analysis reports

---

## Validation & Benchmarks

ZScope was rigorously tested on synthetic data with known ground-truth parameters. Four standard circuits were evaluated at three noise levels (0%, 2%, 5% Gaussian noise):

- Randles circuit
- Randles + Warburg
- CPE-modified Randles
- Two-Time-Constants circuit

**Key Results**:
- Clean data: Relative parameter error < 10⁻¹² %
- 2% noise: Overall RMSE 1.68–1.74%, maximum individual error 1.22%
- 5% noise: Robust recovery within noise level for most parameters (CPE Q–α correlation noted as expected physical behavior)

All benchmarks, raw data, comparison tables, and analysis scripts are available in the [`benchmarks/`](https://github.com/Tecush/ZScope/tree/main/benchmarks) directory.

---

## Scientific Applications

ZScope is designed for real-world electrochemical research across multiple disciplines:

**Battery Science & Energy Storage**  
Detailed characterization of SEI/CEI formation, charge-transfer kinetics, lithium-ion diffusion, degradation pathways, and state-of-health monitoring in Li-ion, Na-ion, and all-solid-state batteries.

**Photovoltaics & Perovskite Solar Cells**  
Investigation of recombination dynamics, ion migration, hysteresis phenomena, capacitance spectroscopy, and interfacial charge accumulation.

**Corrosion & Materials Protection**  
Quantification of polarization resistance, coating delamination, pore resistance, and diffusion-controlled corrosion processes for inhibitor screening and lifetime prediction.

**Fuel Cells & Electrolyzers**  
Deconvolution of ohmic, kinetic, and mass-transport overpotentials in PEM, AEM, and solid-oxide systems.

**Supercapacitors & Pseudocapacitive Materials**  
Analysis of double-layer behavior, faradaic contributions, and porous electrode transmission-line effects.

**Bioelectrochemistry & Sensors**  
Modeling of redox probe kinetics at modified electrodes, biomolecular binding events, and biointerface impedance.

---

## Why Choose ZScope?

| Feature                            | Commercial Tools              | Academic Scripts | **ZScope**                     |
|------------------------------------|-------------------------------|------------------|--------------------------------|
| Bayesian Uncertainty               | Rarely available              | Manual           | Full MCMC posterior            |
| Kramers–Kronig Validation          | Limited                       | Manual           | Integrated + residual maps     |
| Global Optimization                | Local solvers                 | Variable         | DE + TRF multi-start           |
| Interactive Circuit Building       | Mature but expensive          | Text-based       | Real-time visual               |
| Reproducibility & Transparency     | Often limited                 | High             | Excellent                      |
| Cost for Researchers               | High annual licenses          | Free             | Completely free                |

---

## Example: Modified Randles Circuit

```math
Z(\omega) = R_s + \left[ \frac{1}{R_{ct}} + Q (j\omega)^n + \frac{1}{Z_W(\omega)} \right]^{-1}
```
Supports standard and advanced elements including CPE, Warburg variants, Gerischer, transmission lines, and custom impedance formulas.

### Installation
**Windows (Recommended)**  
Download the latest installer from the [Releases page](https://github.com/Tecush/ZScope/releases/latest). No Python or additional dependencies required.

macOS and Linux support are planned for future releases.

**Build from Source**  
```bash
git clone https://github.com/Tecush/ZScope.git
cd ZScope
```
See `BUILDING.md` for detailed instructions.

### Citation
If you use ZScope in your research, please cite:

```bibtex
@software{zscope2026,
  author  = {Mohammadi, Tecush},
  title   = {ZScope: Publication-Grade Electrochemical Impedance Spectroscopy Platform},
  year    = {2026},
  url     = {https://github.com/Tecush/ZScope}
}
```

### Contact
- **Developer**: Tecush Mohammadi  
- **Email**: tecush@gmail.com  
- **GitHub**: [@Tecush](https://github.com/Tecush)

---

<div align="center">
  <sub>Built for the electrochemical research community with scientific rigor.</sub>
</div>
