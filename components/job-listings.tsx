"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Briefcase } from "lucide-react"

export default function JobListings() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null)

  //same hardcoded data for now will be replaced with real data from the API

  const jobListings: JobListing[] = [
    {
      id: "ai-engineer",
      title: "Senior AI Engineer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      remote: true,
    },
    {
      id: "product-manager",
      title: "Product Manager",
      department: "Product",
      location: "New York, NY",
      type: "Full-time",
      remote: true,
    },
    {
      id: "ux-designer",
      title: "UX/UI Designer",
      department: "Design",
      location: "London, UK",
      type: "Full-time",
      remote: true,
    },
    {
      id: "data-scientist",
      title: "Data Scientist",
      department: "Data",
      location: "Berlin, Germany",
      type: "Full-time",
      remote: true,
    },
    {
      id: "marketing-specialist",
      title: "Growth Marketing Specialist",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      remote: true,
    },
  ]

  const departments = Array.from(new Set(jobListings.map((job) => job.department)))

  const filteredJobs = jobListings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = selectedDepartment ? job.department === selectedDepartment : true

    return matchesSearch && matchesDepartment
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search jobs..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {departments.map((department) => (
            <Button
              key={department}
              variant={selectedDepartment === department ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDepartment(selectedDepartment === department ? null : department)}
              className={
                selectedDepartment === department
                  ? "bg-vibrant-accent text-deep-space-blue hover:bg-vibrant-accent/90"
                  : ""
              }
            >
              {department}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass-card glass-card-hover p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-lg">{job.title}</h4>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-foreground/80">
                    <span className="flex items-center">
                      <Briefcase className="mr-1 h-4 w-4 text-vibrant-accent" />
                      {job.department}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4 text-vibrant-accent" />
                      {job.location}
                    </span>
                    <span>{job.type}</span>
                    {job.remote && <span className="text-vibrant-accent">Remote Eligible</span>}
                  </div>
                </div>
                <Button className="shrink-0 bg-vibrant-accent hover:bg-vibrant-accent/90 text-deep-space-blue">
                  Apply Now
                </Button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No jobs found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

