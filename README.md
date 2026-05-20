![ZScope Banner](https://raw.githubusercontent.com/Tecush/ZScope/main/images/splash.png)

<img width="40" height="40" alt="Icon" src="https://github.com/user-attachments/assets/c23f0756-3dc3-46ac-a2b2-4c69e630ff50" />
# ZScope
Advanced electrochemical impedance spectroscopy (EIS) simulation, fitting, and equivalent circuit analysis platform.

### Publication-Grade Electrochemical Impedance Spectroscopy (EIS) Analysis Platform

<p align="center">
<img src="https://github.com/user-attachments/assets/c23f0756-3dc3-46ac-a2b2-4c69e630ff50"/>
</p>

<p align="center">

Modern scientific software for rigorous Electrochemical Impedance Spectroscopy analysis,  
interactive circuit modeling, Bayesian uncertainty quantification, and physically consistent fitting.

</p>

---

## Overview

ZScope is a modern scientific platform designed for advanced Electrochemical Impedance Spectroscopy (EIS) analysis in both academic and industrial research environments.

The software combines physically rigorous impedance modeling, advanced optimization algorithms, Bayesian uncertainty quantification, Kramers–Kronig validation, and interactive circuit simulation within a unified high-performance interface.

ZScope was developed to address a common limitation of many traditional EIS software packages: lack of transparency in fitting methodology and uncertainty interpretation. Instead of functioning as a black-box fitting tool, ZScope emphasizes reproducibility, statistical rigor, and physically meaningful interpretation of electrochemical systems.

The platform is suitable for researchers working in:

- battery science,
- corrosion engineering,
- perovskite solar cells,
- fuel cells,
- supercapacitors,
- electrolysis,
- biosensors,
- and general electrochemical materials research.

---

# Core Capabilities

## Interactive Circuit Modeling

ZScope provides a visual drag-and-drop circuit editor designed specifically for electrochemical impedance workflows.

Equivalent circuits can be constructed interactively while the impedance response is updated in real time. Nyquist and Bode plots remain synchronized with the circuit model, enabling rapid exploratory analysis and intuitive interpretation of electrochemical behavior.

The circuit framework supports both standard and advanced EIS elements, including:

- Resistors (R)
- Capacitors (C)
- Inductors (L)
- Constant Phase Elements (CPE)
- Warburg diffusion (W)
- Gerischer impedance
- Transmission line models
- Bisquert-type structures

The internal notation engine automatically converts graphical topologies into equivalent netlists and mathematical representations.

---

## Advanced Fitting Engine

The fitting framework in ZScope was designed for reliable parameter extraction from noisy, highly correlated, or physically complex impedance spectra.

The optimization backend includes:

- Trust-Region Reflective optimization (TRF)
- Latin Hypercube multi-start initialization
- robust `soft_l1` loss functions
- adaptive parameter bounds
- residual diagnostics
- frequency sub-band fitting
- AIC/BIC model comparison

The objective is not only numerical convergence, but physically meaningful and statistically defensible parameter estimation.

Residual structure, convergence quality, and parameter sensitivity can be inspected directly within the interface.

---

## Bayesian Uncertainty Quantification

ZScope includes a Bayesian MCMC framework for uncertainty-aware electrochemical analysis.

Rather than relying exclusively on point estimates, Bayesian analysis enables exploration of full posterior parameter distributions and model uncertainty.

Outputs include:

- posterior distributions,
- 95% credible intervals,
- predictive uncertainty bands,
- convergence diagnostics,
- autocorrelation analysis,
- parameter correlation analysis.

This provides significantly deeper insight into model identifiability and parameter confidence compared with classical least-squares fitting alone.

---

## Kramers–Kronig Validation

Experimental impedance data may contain drift, instability, or non-linear behavior that invalidates classical equivalent-circuit interpretation.

ZScope includes lightweight lin-KK validation tools to assess physical consistency prior to fitting.

This allows rapid identification of:

- non-stationary systems,
- unstable measurements,
- non-linear responses,
- and frequency inconsistencies.

Validation-aware workflows help prevent extraction of non-physical parameters from invalid datasets.

---

## High-Performance Numerical Backend

The computational core of ZScope is fully vectorized for rapid impedance evaluation and responsive user interaction.

This enables:

- real-time simulation updates,
- rapid iterative fitting,
- large frequency sweeps,
- and responsive visualization.

Typical workflows achieve near real-time Nyquist and Bode updates even during complex fitting operations.

---

## Scientific Visualization & Reporting

ZScope includes integrated publication-oriented visualization tools for scientific reporting.

Researchers can generate:

- Nyquist plots,
- Bode magnitude and phase plots,
- residual diagnostics,
- posterior parameter distributions,
- uncertainty bands,
- parameter tables,
- and reproducible fit reports.

Figures can be exported for:

- publications,
- conference presentations,
- theses,
- supplementary information,
- and laboratory documentation.

---

# Scientific Applications

ZScope is suitable for a broad range of electrochemical and materials-science applications.

## Battery Research

Analyze:

- charge-transfer resistance,
- solid-electrolyte interfaces (SEI),
- diffusion behavior,
- degradation mechanisms,
- and transport limitations.

Applications include lithium-ion, sodium-ion, and solid-state battery systems.

---

## Perovskite Solar Cells

Investigate:

- recombination dynamics,
- ionic transport,
- interfacial charge accumulation,
- capacitance behavior,
- and transport phenomena.

The platform is particularly useful for studying frequency-dependent interfacial processes in hybrid perovskite devices.

---

## Corrosion Science

Characterize:

- polarization resistance,
- coating integrity,
- diffusion-controlled kinetics,
- and electrochemical degradation mechanisms.

---

## Fuel Cells & Electrolyzers

Study:

- catalytic activity,
- electrode interfaces,
- charge-transfer processes,
- and mass transport limitations.

---

## Supercapacitors & Energy Storage

Evaluate:

- porous electrode behavior,
- double-layer capacitance,
- diffusion impedance,
- and frequency-dependent energy-storage mechanisms.

---

# Why ZScope?

| Traditional EIS Software | ZScope |
|---|---|
| Black-box fitting procedures | Transparent methodology |
| Limited uncertainty interpretation | Bayesian uncertainty quantification |
| Static workflows | Interactive real-time modeling |
| Minimal diagnostics | Comprehensive residual analysis |
| Physically ambiguous fitting | Validation-aware workflows |
| Enterprise-focused licensing | Academic-friendly accessibility |

---

# Example Impedance Relation

The impedance response of a simple Randles-type electrochemical interface may be expressed as:

```math id="93l09y"
Z(\omega)=R_s+\frac{1}{\frac{1}{R_{ct}}+j\omega C_{dl}}
