# ZScope Benchmark Report

## Executive Summary
- **Circuits tested**: 4
- **Test conditions**: Clean, 2% noise, 5% noise
- **Metrics**: χ²_reduced, RMSE, parameter recovery error, computation time

## Results by Circuit

### Randles

**clean**:
- χ²_reduced: `0.0000`
- RMSE: `0 Ω` (0.00%)
- Time: `1.33 s`
- Parameter errors:
  - ✓ `Rct.R`: 0.00%
  - ✓ `Rs.R`: 0.00%
  - ✓ `Cdl.C`: 0.00%

**noisy_2pct**:
- χ²_reduced: `0.0002`
- RMSE: `2.88 Ω` (1.55%)
- Time: `0.67 s`
- Parameter errors:
  - ✓ `Rs.R`: 0.33%
  - ✓ `Rct.R`: 0.16%
  - ✓ `Cdl.C`: 0.04%

**noisy_5pct**:
- χ²_reduced: `0.0012`
- RMSE: `8.031 Ω` (4.06%)
- Time: `0.64 s`
- Parameter errors:
  - ✓ `Cdl.C`: 1.51%
  - ✓ `Rct.R`: 1.13%
  - ✓ `Rs.R`: 0.90%

### Randles_Warburg

**clean**:
- χ²_reduced: `0.0000`
- RMSE: `9.877e-14 Ω` (0.00%)
- Time: `2.88 s`
- Parameter errors:
  - ✓ `W.sigma`: 0.00%
  - ✓ `Cdl.C`: 0.00%
  - ✓ `Rct.R`: 0.00%
  - ✓ `Rs.R`: 0.00%

**noisy_2pct**:
- χ²_reduced: `0.0001`
- RMSE: `3.624 Ω` (1.57%)
- Time: `1.33 s`
- Parameter errors:
  - ✓ `Rs.R`: 0.36%
  - ✓ `Rct.R`: 0.18%
  - ✓ `Cdl.C`: 0.10%
  - ✓ `W.sigma`: 0.04%

**noisy_5pct**:
- χ²_reduced: `0.0010`
- RMSE: `11.06 Ω` (4.15%)
- Time: `1.20 s`
- Parameter errors:
  - ✓ `W.sigma`: 3.31%
  - ✓ `Cdl.C`: 1.19%
  - ✓ `Rs.R`: 1.03%
  - ✓ `Rct.R`: 0.07%

### CPE_Randles

**clean**:
- χ²_reduced: `0.0000`
- RMSE: `6.945e-14 Ω` (0.00%)
- Time: `2.94 s`
- Parameter errors:
  - ✓ `CPE.Q`: 0.00%
  - ✓ `Rct.R`: 0.00%
  - ✓ `CPE.alpha`: 0.00%
  - ✓ `Rs.R`: 0.00%

**noisy_2pct**:
- χ²_reduced: `0.0002`
- RMSE: `2.908 Ω` (1.52%)
- Time: `1.28 s`
- Parameter errors:
  - ✓ `CPE.Q`: 0.99%
  - ✓ `Rs.R`: 0.87%
  - ✓ `CPE.alpha`: 0.22%
  - ✓ `Rct.R`: 0.11%

**noisy_5pct**:
- χ²_reduced: `0.0011`
- RMSE: `8.24 Ω` (3.95%)
- Time: `1.23 s`
- Parameter errors:
  - ⚠ `CPE.Q`: 9.47%
  - ✓ `Rs.R`: 2.53%
  - ✓ `Rct.R`: 1.37%
  - ✓ `CPE.alpha`: 1.29%

### Two_TimeConstants

**clean**:
- χ²_reduced: `0.0000`
- RMSE: `1.522e-14 Ω` (0.00%)
- Time: `5.79 s`
- Parameter errors:
  - ✓ `R2.R`: 0.00%
  - ✓ `C2.C`: 0.00%
  - ✓ `Rs.R`: 0.00%
  - ✓ `R1.R`: 0.00%
  - ✓ `C1.C`: 0.00%

**noisy_2pct**:
- χ²_reduced: `0.0002`
- RMSE: `4.142 Ω` (1.56%)
- Time: `2.56 s`
- Parameter errors:
  - ✓ `C2.C`: 1.48%
  - ✓ `R1.R`: 1.42%
  - ✓ `Rs.R`: 0.54%
  - ✓ `C1.C`: 0.53%
  - ✓ `R2.R`: 0.51%

**noisy_5pct**:
- χ²_reduced: `0.0011`
- RMSE: `11.5 Ω` (4.04%)
- Time: `2.34 s`
- Parameter errors:
  - ✓ `C2.C`: 4.45%
  - ✓ `R2.R`: 1.56%
  - ✓ `R1.R`: 1.33%
  - ✓ `Rs.R`: 1.19%
  - ✓ `C1.C`: 0.69%

## Interpretation Guidelines
- **χ²_reduced ≈ 1.0**: Ideal fit (residuals match assumed noise level)
- **RMSE < 1%**: Excellent parameter recovery
- **Parameter error < 5%**: High confidence in fitted values
- **Parameter error 5-10%**: Acceptable for most research applications
- **Parameter error > 10%**: Investigate model adequacy or data quality

## Next Steps
1. Compare these results against ZView outputs using `parse_zview_results.py`
2. Generate comparison tables with `create_comparison_table()`
3. Create publication-ready figures with `plot_parameter_accuracy()`
