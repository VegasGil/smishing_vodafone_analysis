# INFORME DE ANÁLISIS DE PHISHING - INSIDE RESPONSE

## Datos del incidente
- **Fecha:** 08/10/2026
- **Analista:** Freddy 
- **Canal:** SMS fraudulento
- **Suplantación:** Vodafone España

## Resumen ejecutivo
Análisis forense de un SMS fraudulento que suplanta a Vodafone España. 
El atacante utiliza un acortador de URL para redirigir a una página clonada 
de Vodafone que roba el número de teléfono de la víctima para realizar 
SIM Swapping e interceptar códigos 2FA.

## URL del SMS
`https://goo.su/-9Vodafone`

## URL final de phishing
`https://vodafone-one-09.cloudaccess.host/v/payment/factura_d/anchor_002.htm`

## Infraestructura del atacante
- **IP:** 82.202.170.126 (Rusia)
- **Hosting:** cloudaccess.host
- **Servidor web:** Nginx
- **País:** Rusia (ASN: RU-JSCIOT)

## Técnicas detectadas
- Phishing dirigido (Spear Phishing)
- SIM Swapping (robo de número de teléfono)
- Clonación de página de Vodafone
- Formulario con campo `payment_invoice[phone]`
- Timestamp del malware: 1743587523957 (02/04/2025)
- Página 404 en ruso
- Cloaking (VirusTotal 0/93)

## Herramientas utilizadas
- **Any.Run:** Sandbox para análisis dinámico
- **VirusTotal:** Análisis multi-antivirus
- **curl:** Descarga de HTML
- **grep:** Búsqueda de patrones
- **js-beautify:** Formateo de JavaScript
- **URLhaus:** Reporte de URL maliciosa

## IoCs confirmados
| Tipo | Valor |
|------|-------|
| URL SMS | `https://goo.su/-9Vodafone` |
| URL phishing | `https://vodafone-one-09.cloudaccess.host/v/payment/factura_d/anchor_002.htm` |
| IP | 82.202.170.126 |
| Hosting | cloudaccess.host |
| Campo HTML | payment_invoice[phone] |
| Timestamp | 1743587523957 |

## Acciones tomadas
- [x] No hacer clic en la URL
- [x] Bloquear el número de teléfono
- [x] Analizar en Any.Run
- [x] Analizar en VirusTotal
- [x] Descargar HTML con curl
- [x] Analizar JavaScript
- [x] Reportar en URLhaus (URL final)
- [ ] Reportar en PhishTank
- [ ] Reportar en Google Safe Browsing
- [ ] Reportar a Vodafone
- [ ] Verificar cuenta real de Vodafone

## Recomendaciones
1. No hacer clic en enlaces de SMS no solicitados
2. Verificar siempre la URL del remitente
3. Activar 2FA con aplicación (no SMS)
4. Reportar SMS fraudulentos al operador
5. Mantener el navegador y antivirus actualizados

## Lecciones aprendidas
- Los atacantes usan acortadores para ocultar la URL real
- Los hostings legítimos pueden alojar páginas de phishing
- VirusTotal no siempre detecta el phishing (cloaking)
- URLhaus es más fiable para reportar phishing
- El análisis manual es más valioso que las herramientas automatizadas

## Nota del analista
Este informe es un análisis en curso. Algunas conclusiones son preliminares 
y pueden ser refinadas con más evidencia. Las hipótesis están marcadas como tales.

## Sobre el autor
- **GitHub:** [@VegasGil](https://github.com/VegasGil)
- **LinkedIn:** [Freddy Alexis Vegas](https://www.linkedin.com/in/freddy-vegas/)