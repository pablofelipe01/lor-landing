'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import { sectionIds } from '@/lib/utils'
import { CTAButton } from './ui'

// Types
interface CalculatorInputs {
  hectares: number
  workers: number
  terrain: 'flat' | 'rolling' | 'mountainous'
  distribution: 'concentrated' | 'medium' | 'dispersed'
}

interface CalculatorResults {
  extraNodes: number
  extraRepeaters: number
  coverageGuaranteed: number
  licenseINL: number
  additionalNodesCost: number
  additionalRepeatersCost: number
  flutterApp: number
  annualMaintenance: number
  totalInitial: number
  satelliteCost3Years: number
  radiosCost: number
  savings3Years: number
  isValid: boolean
  errors: string[]
}

// Countries data
const countriesData = [
  { country: 'Brasil', hectares: '235-284M', producers: '3.6M', disconnected: '67-81%' },
  { country: 'Argentina', hectares: '102M', producers: '144K', disconnected: '65%' },
  { country: 'Colombia', hectares: '42.5M', producers: '2.3M', disconnected: '85%' },
  { country: 'Paraguay', hectares: '22-23M', producers: '210K', disconnected: '72-77%' },
  { country: 'Mexico', hectares: '10.1M', producers: '1.6M', disconnected: '31.5%' },
]

// Comparison table data
const comparisonFeatures = [
  { key: 'compInitialInvestment', sirius: '$14K', satellite: '$108K', radios: '$15K', cellular: '$500K-2M' },
  { key: 'compMonthlyCost', sirius: '$83', satellite: '$4-6K', radios: '$0', cellular: '$5-15K' },
  { key: 'compRange', sirius: '100-200km²', satellite: 'globalLimited', radios: '5-15km', cellular: '5-20km/torre' },
  { key: 'compDataTransmission', sirius: 'yes', satellite: 'yes', radios: 'voiceOnly', cellular: 'yes' },
  { key: 'compMeshInternet', sirius: 'meshInternetFull', satellite: 'meshInternetNA', radios: 'no', cellular: 'meshInternetOneWay' },
  { key: 'compEncryption', sirius: 'aes256', satellite: 'yes', radios: 'no', cellular: 'yes' },
  { key: 'compCustomApps', sirius: 'tailorMade', satellite: 'generic', radios: 'no', cellular: 'partial' },
  { key: 'compAI', sirius: 'included', satellite: 'extra', radios: 'no', cellular: 'extra' },
  { key: 'compImplementation', sirius: '3-4 sem', satellite: '1-2 meses', radios: '1-2 sem', cellular: '12-36 meses' },
  { key: 'compOwnership', sirius: 'clientOwned', satellite: 'rented', radios: 'yes', cellular: 'partial' },
  { key: 'compScalability', sirius: 'costDecreases', satellite: 'linear', radios: 'partial', cellular: 'no' },
  { key: 'compROI', sirius: '1-2 meses', satellite: 'never', radios: '6-12 meses', cellular: '10+ anos' },
  { key: 'compOffline', sirius: 'yes', satellite: 'no', radios: 'yes', cellular: 'no' },
]

// Latin American countries for form
const latinAmericanCountries = [
  'Argentina', 'Bolivia', 'Brasil', 'Chile', 'Colombia', 'Costa Rica',
  'Ecuador', 'El Salvador', 'Guatemala', 'Honduras', 'Mexico',
  'Nicaragua', 'Panama', 'Paraguay', 'Peru', 'Republica Dominicana',
  'Uruguay', 'Venezuela'
]

// Calculator logic
function calculateInvestment(inputs: CalculatorInputs): CalculatorResults {
  const errors: string[] = []

  // Validation
  if (inputs.hectares < 100) {
    errors.push('validationMinHectares')
  }
  if (inputs.workers < 5) {
    errors.push('validationMinWorkers')
  }

  if (errors.length > 0) {
    return {
      extraNodes: 0,
      extraRepeaters: 0,
      coverageGuaranteed: 0,
      licenseINL: 10000,
      additionalNodesCost: 0,
      additionalRepeatersCost: 0,
      flutterApp: 3000,
      annualMaintenance: 1000,
      totalInitial: 0,
      satelliteCost3Years: 0,
      radiosCost: 0,
      savings3Years: 0,
      isValid: false,
      errors,
    }
  }

  // Distribution factor
  const distributionFactors = {
    concentrated: 0.3,
    medium: 0.6,
    dispersed: 1.0,
  }

  // Terrain factor
  const terrainFactors = {
    flat: 1.0,
    rolling: 0.8,
    mountainous: 0.6,
  }

  const distributionFactor = distributionFactors[inputs.distribution]
  const terrainFactor = terrainFactors[inputs.terrain]

  // Base coverage calculation
  let repeatersBase = Math.ceil(inputs.hectares / 500)
  const nodeCoverage = inputs.workers * distributionFactor * 50
  let totalCoverage = (repeatersBase * 500) + nodeCoverage

  // Apply terrain adjustment
  totalCoverage *= terrainFactor

  // Add repeaters if needed to cover all hectares
  while (totalCoverage < inputs.hectares) {
    repeatersBase++
    totalCoverage = ((repeatersBase * 500) + nodeCoverage) * terrainFactor
  }

  // Calculate extra hardware beyond what's included in license
  const extraNodes = Math.max(0, inputs.workers - 20)
  const extraRepeaters = Math.max(0, repeatersBase - 3)

  // Costs
  const licenseINL = 10000
  const additionalNodesCost = extraNodes * 40
  const additionalRepeatersCost = extraRepeaters * 110
  const flutterApp = 3000
  const annualMaintenance = 1000

  const totalInitial = licenseINL + additionalNodesCost + additionalRepeatersCost + flutterApp

  // Comparisons
  const satelliteCost3Years = (inputs.workers * 50 * 36) + (inputs.workers * 1500)
  const radiosCost = inputs.workers * 300

  // Savings (3 years: initial + 3x maintenance vs satellite)
  const totalCost3Years = totalInitial + (annualMaintenance * 3)
  const savings3Years = satelliteCost3Years - totalCost3Years

  return {
    extraNodes,
    extraRepeaters,
    coverageGuaranteed: Math.round(totalCoverage),
    licenseINL,
    additionalNodesCost,
    additionalRepeatersCost,
    flutterApp,
    annualMaintenance,
    totalInitial,
    satelliteCost3Years,
    radiosCost,
    savings3Years,
    isValid: true,
    errors: [],
  }
}

// Format number with thousand separators
function formatNumber(num: number): string {
  return new Intl.NumberFormat('es-ES').format(num)
}

// Format currency
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function B2B() {
  const { t, language } = useI18n()

  // Calculator state
  const [inputs, setInputs] = useState<CalculatorInputs>({
    hectares: 500,
    workers: 25,
    terrain: 'flat',
    distribution: 'medium',
  })

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    hectares: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Calculate results
  const results = useMemo(() => calculateInvestment(inputs), [inputs])

  // Handle calculator input change
  const handleInputChange = (field: keyof CalculatorInputs, value: string | number) => {
    setInputs(prev => ({
      ...prev,
      [field]: typeof value === 'string' && (field === 'hectares' || field === 'workers')
        ? parseInt(value) || 0
        : value,
    }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  // Render comparison cell value
  const renderCellValue = (value: string) => {
    const translatedValues = ['yes', 'no', 'partial', 'voiceOnly', 'generic', 'extra', 'tailorMade', 'included', 'rented', 'clientOwned', 'costDecreases', 'linear', 'never', 'globalLimited', 'aes256', 'meshInternetFull', 'meshInternetNA', 'meshInternetOneWay']

    if (translatedValues.includes(value)) {
      const translated = t(`b2b.${value}`)
      if (value === 'yes' || value === 'meshInternetFull') return <span className="text-green-600 font-semibold">{translated}</span>
      if (value === 'no' || value === 'meshInternetNA') return <span className="text-red-500">{translated}</span>
      if (value === 'partial' || value === 'extra' || value === 'generic' || value === 'meshInternetOneWay') return <span className="text-yellow-600">{translated}</span>
      return translated
    }
    return value
  }

  return (
    <section id={sectionIds.b2b} className="relative">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 text-white py-20 lg:py-32">
        <div className="container-custom px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-5xl mx-auto"
          >
            <span className="inline-block px-4 py-2 bg-primary-500/20 text-primary-300 rounded-full text-sm font-medium mb-6">
              {t('b2b.badge')}
            </span>

            {/* Video */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-10 max-w-4xl mx-auto"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black/50">
                <video
                  key={language}
                  controls
                  className="w-full aspect-video"
                  poster="/images/video-poster-b2b.jpg"
                >
                  <source
                    src={language === 'es' ? '/images/video2espanol.mp4' : '/images/video2english.mp4'}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
              {t('b2b.heroTitle')}
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
              {t('b2b.heroSubtitle')}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { value: t('b2b.stat1Value'), label: t('b2b.stat1Label') },
                { value: t('b2b.stat2Value'), label: t('b2b.stat2Label') },
                { value: t('b2b.stat3Value'), label: t('b2b.stat3Label') },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary-400 mb-2">{stat.value}</div>
                  <div className="text-slate-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <CTAButton href="#calculadora-b2b" size="lg" className="bg-primary-500 hover:bg-primary-600">
              {t('b2b.ctaCalculator')}
            </CTAButton>
          </motion.div>
        </div>
      </div>

      {/* Problem Context Section */}
      <div className="section-padding bg-slate-50">
        <div className="container-custom px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {t('b2b.problemTitle')}
            </h2>
          </motion.div>

          {/* Problem Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { title: t('b2b.problem1Title'), desc: t('b2b.problem1Desc'), icon: '📉' },
              { title: t('b2b.problem2Title'), desc: t('b2b.problem2Desc'), icon: '⚠️' },
              { title: t('b2b.problem3Title'), desc: t('b2b.problem3Desc'), icon: '💸' },
              { title: t('b2b.problem4Title'), desc: t('b2b.problem4Desc'), icon: '📵' },
            ].map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{problem.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{problem.title}</h3>
                <p className="text-slate-600 text-sm">{problem.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Countries Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="bg-slate-800 text-white px-6 py-4">
              <h3 className="text-xl font-bold">{t('b2b.countriesTitle')}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">{t('b2b.tableCountry')}</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">{t('b2b.tableHectares')}</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">{t('b2b.tableProducers')}</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">{t('b2b.tableDisconnected')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {countriesData.map((row, index) => (
                    <tr key={index} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">{row.country}</td>
                      <td className="px-6 py-4 text-slate-600">{row.hectares}</td>
                      <td className="px-6 py-4 text-slate-600">{row.producers}</td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                          {row.disconnected}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Calculator Section */}
      <div id="calculadora-b2b" className="section-padding bg-white">
        <div className="container-custom px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {t('b2b.calculatorTitle')}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t('b2b.calculatorSubtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Inputs Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-2xl p-6 md:p-8"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-6">Inputs</h3>

              <div className="space-y-6">
                {/* Hectares */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t('b2b.inputHectares')}
                  </label>
                  <input
                    type="number"
                    min="100"
                    value={inputs.hectares}
                    onChange={(e) => handleInputChange('hectares', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  />
                </div>

                {/* Workers */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t('b2b.inputWorkers')}
                  </label>
                  <input
                    type="number"
                    min="5"
                    value={inputs.workers}
                    onChange={(e) => handleInputChange('workers', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  />
                </div>

                {/* Terrain */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t('b2b.inputTerrain')}
                  </label>
                  <select
                    value={inputs.terrain}
                    onChange={(e) => handleInputChange('terrain', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-white"
                  >
                    <option value="flat">{t('b2b.terrainFlat')}</option>
                    <option value="rolling">{t('b2b.terrainRolling')}</option>
                    <option value="mountainous">{t('b2b.terrainMountainous')}</option>
                  </select>
                </div>

                {/* Distribution */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t('b2b.inputDistribution')}
                  </label>
                  <select
                    value={inputs.distribution}
                    onChange={(e) => handleInputChange('distribution', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-white"
                  >
                    <option value="concentrated">{t('b2b.distributionConcentrated')}</option>
                    <option value="medium">{t('b2b.distributionMedium')}</option>
                    <option value="dispersed">{t('b2b.distributionDispersed')}</option>
                  </select>
                </div>
              </div>

              {/* Validation Errors */}
              {results.errors.length > 0 && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  {results.errors.map((error, index) => (
                    <p key={index} className="text-red-600 text-sm">
                      {t(`b2b.${error}`)}
                    </p>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Results Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-primary-50 rounded-2xl p-6 md:p-8 border-2 border-primary-200"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-6">{t('b2b.resultsTitle')}</h3>

              {results.isValid ? (
                <div className="space-y-6">
                  {/* Configuration */}
                  <div className="bg-white rounded-xl p-4">
                    <h4 className="font-semibold text-slate-800 mb-3">{t('b2b.configTitle')}</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-600">{t('b2b.extraNodes')}:</span>
                        <span className="ml-2 font-bold text-slate-900">{results.extraNodes}</span>
                      </div>
                      <div>
                        <span className="text-slate-600">{t('b2b.extraRepeaters')}:</span>
                        <span className="ml-2 font-bold text-slate-900">{results.extraRepeaters}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-slate-600">{t('b2b.coverageGuaranteed')}:</span>
                        <span className="ml-2 font-bold text-green-600">{formatNumber(results.coverageGuaranteed)} {t('b2b.hectaresUnit')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Cost Breakdown */}
                  <div className="bg-white rounded-xl p-4">
                    <h4 className="font-semibold text-slate-800 mb-3">{t('b2b.costBreakdown')}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">{t('b2b.licenseINL')}</span>
                        <span className="font-medium">{formatCurrency(results.licenseINL)}</span>
                      </div>
                      {results.additionalNodesCost > 0 && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">{t('b2b.additionalNodes')} ({results.extraNodes} x $40)</span>
                          <span className="font-medium">{formatCurrency(results.additionalNodesCost)}</span>
                        </div>
                      )}
                      {results.additionalRepeatersCost > 0 && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">{t('b2b.additionalRepeaters')} ({results.extraRepeaters} x $110)</span>
                          <span className="font-medium">{formatCurrency(results.additionalRepeatersCost)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-slate-600">{t('b2b.flutterApp')}</span>
                        <span className="font-medium">{formatCurrency(results.flutterApp)}</span>
                      </div>
                      <div className="flex justify-between text-slate-500 text-xs pt-2 border-t">
                        <span>{t('b2b.annualMaintenance')}</span>
                        <span>{formatCurrency(results.annualMaintenance)}/año</span>
                      </div>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="bg-primary-600 text-white rounded-xl p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{t('b2b.totalInitial')}</span>
                      <span className="text-2xl font-bold">{formatCurrency(results.totalInitial)}</span>
                    </div>
                  </div>

                  {/* Comparison */}
                  <div className="bg-white rounded-xl p-4">
                    <h4 className="font-semibold text-slate-800 mb-3">{t('b2b.comparisonTitle')}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">{t('b2b.vsSatellite')}</span>
                        <span className="font-medium text-red-600">{formatCurrency(results.satelliteCost3Years)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">{t('b2b.vsRadios')}</span>
                        <span className="font-medium">{formatCurrency(results.radiosCost)}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-green-200 bg-green-50 -mx-4 px-4 py-2 rounded-b-lg">
                        <span className="font-semibold text-green-800">{t('b2b.savings3Years')}</span>
                        <span className="font-bold text-green-600 text-lg">{formatCurrency(results.savings3Years)}</span>
                      </div>
                    </div>
                  </div>

                  {/* ROI */}
                  <div className="text-center">
                    <span className="text-slate-600">{t('b2b.roiEstimated')}:</span>
                    <span className="ml-2 text-2xl font-bold text-primary-600">{t('b2b.roiValue')}</span>
                  </div>

                  {/* CTA */}
                  <CTAButton href="#contacto-b2b" className="w-full justify-center">
                    {t('b2b.ctaQuote')}
                  </CTAButton>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500">
                  <svg className="w-16 h-16 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <p>Ingresa valores validos para ver resultados</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Comparison Table Section */}
      <div className="section-padding bg-slate-50">
        <div className="container-custom px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {t('b2b.compTableTitle')}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-x-auto"
          >
            <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden min-w-[800px]">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="px-4 py-4 text-left font-semibold">{t('b2b.compFeature')}</th>
                  <th className="px-4 py-4 text-center font-semibold bg-primary-600">{t('b2b.compSirius')}</th>
                  <th className="px-4 py-4 text-center font-semibold">{t('b2b.compSatellite')}</th>
                  <th className="px-4 py-4 text-center font-semibold">{t('b2b.compRadios')}</th>
                  <th className="px-4 py-4 text-center font-semibold">{t('b2b.compCellular')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonFeatures.map((row, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-4 font-medium text-slate-900">{t(`b2b.${row.key}`)}</td>
                    <td className="px-4 py-4 text-center bg-primary-50 font-semibold text-primary-800">
                      {renderCellValue(row.sirius)}
                    </td>
                    <td className="px-4 py-4 text-center text-slate-600">{renderCellValue(row.satellite)}</td>
                    <td className="px-4 py-4 text-center text-slate-600">{renderCellValue(row.radios)}</td>
                    <td className="px-4 py-4 text-center text-slate-600">{renderCellValue(row.cellular)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div id="contacto-b2b" className="section-padding bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 text-white">
        <div className="container-custom px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('b2b.contactTitle')}
              </h2>
              <p className="text-lg text-slate-300">
                {t('b2b.contactSubtitle')}
              </p>
            </motion.div>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center"
              >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">{t('b2b.formSuccess')}</h3>
                <p className="text-slate-300">{t('b2b.formSuccessMsg')}</p>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onSubmit={handleSubmit}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('b2b.formName')} *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-white placeholder-slate-400"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('b2b.formEmail')} *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-white placeholder-slate-400"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('b2b.formPhone')} *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+54 9 11 1234-5678"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-white placeholder-slate-400"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('b2b.formCompany')} *</label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-white placeholder-slate-400"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('b2b.formCountry')} *</label>
                    <select
                      required
                      value={formData.country}
                      onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-white"
                    >
                      <option value="" className="text-slate-900">{t('b2b.formSelectCountry')}</option>
                      {latinAmericanCountries.map(country => (
                        <option key={country} value={country} className="text-slate-900">{country}</option>
                      ))}
                    </select>
                  </div>

                  {/* Hectares */}
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('b2b.formHectares')}</label>
                    <input
                      type="number"
                      value={formData.hectares}
                      onChange={(e) => setFormData(prev => ({ ...prev, hectares: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-white placeholder-slate-400"
                    />
                  </div>

                  {/* Message */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">{t('b2b.formMessage')}</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-white placeholder-slate-400 resize-none"
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        {t('b2b.formSubmitting')}
                      </>
                    ) : (
                      t('b2b.formSubmit')
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
