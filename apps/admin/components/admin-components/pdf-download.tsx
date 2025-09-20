"use client"
import { Button } from "@workspace/ui/components/button"
import type React from "react"

import { Download } from "lucide-react"
import { useRef } from "react"

interface PDFDownloadProps {
  children: React.ReactNode
  filename?: string
}

export function PDFDownload({ children, filename = "resume.pdf" }: PDFDownloadProps) {
  const printRef = useRef<HTMLDivElement>(null)

  const handleDownloadPDF = async () => {
    if (!printRef.current) return

    try {
      // Dynamic import to reduce bundle size
      const html2canvas = (await import("html2canvas")).default
      const jsPDF = (await import("jspdf")).default

      const element = printRef.current
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF("p", "mm", "a4")

      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(filename)
    } catch (error) {
      console.error("Error generating PDF:", error)
    }
  }

  return (
    <div>
      <Button onClick={handleDownloadPDF} className="mb-4">
        <Download className="mr-2 h-4 w-4" />
        Download PDF
      </Button>
      <div ref={printRef} className="print:shadow-none">
        {children}
      </div>
    </div>
  )
}
