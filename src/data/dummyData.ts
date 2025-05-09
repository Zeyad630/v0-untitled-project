export const repairCenters = [
  {
    id: "center1",
    name: "TechFix Solutions",
    location: "123 Main St, New York, NY",
    contact: "(212) 555-1234",
    rating: 4.8,
    specialties: ["Smartphones", "Laptops", "Tablets"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "center2",
    name: "Gadget Repair Pro",
    location: "456 Market St, San Francisco, CA",
    contact: "(415) 555-6789",
    rating: 4.6,
    specialties: ["iPhones", "MacBooks", "Gaming Consoles"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "center3",
    name: "Quick Device Repair",
    location: "789 Tech Blvd, Austin, TX",
    contact: "(512) 555-9876",
    rating: 4.7,
    specialties: ["Android Phones", "Windows Laptops", "Smart Home Devices"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "center4",
    name: "Smart Repair Hub",
    location: "321 Innovation Dr, Seattle, WA",
    contact: "(206) 555-4321",
    rating: 4.9,
    specialties: ["All Smartphones", "Tablets", "Wearables"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "center5",
    name: "Express Tech Repair",
    location: "555 Digital Ave, Chicago, IL",
    contact: "(312) 555-7890",
    rating: 4.5,
    specialties: ["Water Damage", "Screen Replacement", "Battery Issues"],
    image: "/placeholder.svg?height=200&width=300",
  },
]

export const services = [
  {
    id: "service1",
    title: "Screen Repair",
    description: "Fix cracked or broken screens for all device types",
    icon: "phone",
    price: "From $49",
  },
  {
    id: "service2",
    title: "Battery Replacement",
    description: "Restore your device's battery life with a new battery",
    icon: "battery-charging",
    price: "From $39",
  },
  {
    id: "service3",
    title: "Water Damage Repair",
    description: "Specialized treatment for water-damaged devices",
    icon: "droplets",
    price: "From $89",
  },
  {
    id: "service4",
    title: "Software Issues",
    description: "Fix system errors, crashes, and software problems",
    icon: "settings",
    price: "From $29",
  },
  {
    id: "service5",
    title: "Camera Repair",
    description: "Fix blurry photos and camera functionality issues",
    icon: "camera",
    price: "From $59",
  },
  {
    id: "service6",
    title: "Charging Port Repair",
    description: "Fix charging issues and replace damaged ports",
    icon: "plug",
    price: "From $45",
  },
]

export const deviceTypes = [
  { value: "iphone", label: "iPhone" },
  { value: "android", label: "Android Phone" },
  { value: "ipad", label: "iPad" },
  { value: "tablet", label: "Android Tablet" },
  { value: "macbook", label: "MacBook" },
  { value: "windows", label: "Windows Laptop" },
  { value: "desktop", label: "Desktop Computer" },
  { value: "smartwatch", label: "Smartwatch" },
  { value: "gaming", label: "Gaming Console" },
  { value: "other", label: "Other Device" },
]

// Simulated AI diagnosis responses
export const simulateDiagnosis = (deviceType: string, problem: string) => {
  // In a real app, this would call an actual AI API

  const lowercaseProblem = problem.toLowerCase()

  // Simple problems that can be fixed without repair
  const simpleProblems = [
    "restart",
    "reboot",
    "frozen",
    "slow",
    "update",
    "wifi",
    "bluetooth",
    "connection",
    "not connecting",
    "password",
    "forgot password",
    "app",
    "application",
    "install",
    "uninstall",
  ]

  // Check if any simple problem keywords are in the description
  const isSimpleProblem = simpleProblems.some((keyword) => lowercaseProblem.includes(keyword))

  // Generate a solution based on the problem
  let solution = ""
  let severity: "Simple" | "Needs Repair" = "Needs Repair"

  if (isSimpleProblem) {
    severity = "Simple"

    if (
      lowercaseProblem.includes("restart") ||
      lowercaseProblem.includes("reboot") ||
      lowercaseProblem.includes("frozen")
    ) {
      solution = `Try a force restart of your ${deviceType}. For most devices, hold the power button for 10 seconds. If that doesn't work, try holding power + volume down buttons together for 10-15 seconds.`
    } else if (lowercaseProblem.includes("slow")) {
      solution = `Your ${deviceType} may be running slow due to low storage or too many background apps. Try clearing cache, removing unused apps, and restarting your device.`
    } else if (
      lowercaseProblem.includes("wifi") ||
      lowercaseProblem.includes("bluetooth") ||
      lowercaseProblem.includes("connection")
    ) {
      solution = `For connectivity issues, try: 1) Toggle airplane mode on/off, 2) Restart your router, 3) Forget the network and reconnect, 4) Check for system updates.`
    } else if (lowercaseProblem.includes("password")) {
      solution = `For password issues, try the 'Forgot Password' option on the login screen. You may need to verify your identity through email or phone number.`
    } else if (lowercaseProblem.includes("app") || lowercaseProblem.includes("application")) {
      solution = `Try force closing the app and reopening it. If that doesn't work, uninstall and reinstall the app. Make sure your device's operating system is up to date.`
    } else {
      solution = `Based on your description, this appears to be a software issue that you can fix yourself. Try restarting your device, checking for system updates, and clearing cache. If the problem persists, you may need professional assistance.`
    }
  } else {
    // Hardware problems that need repair
    severity = "Needs Repair"

    if (
      lowercaseProblem.includes("screen") ||
      lowercaseProblem.includes("display") ||
      lowercaseProblem.includes("crack")
    ) {
      solution = `Your ${deviceType} likely needs a screen replacement. This requires professional repair as it involves disassembling the device and replacing hardware components.`
    } else if (
      lowercaseProblem.includes("battery") ||
      lowercaseProblem.includes("charging") ||
      lowercaseProblem.includes("power")
    ) {
      solution = `This appears to be a battery or charging system issue. Your ${deviceType} may need a battery replacement or charging port repair, which should be done by a professional technician.`
    } else if (
      lowercaseProblem.includes("water") ||
      lowercaseProblem.includes("liquid") ||
      lowercaseProblem.includes("wet")
    ) {
      solution = `Water damage requires immediate professional attention. Do not charge your device or turn it on if it's been exposed to liquid. A technician needs to clean the internal components to prevent corrosion.`
    } else if (
      lowercaseProblem.includes("camera") ||
      lowercaseProblem.includes("photo") ||
      lowercaseProblem.includes("picture")
    ) {
      solution = `Your ${deviceType}'s camera module may be damaged or disconnected. This requires opening the device and replacing or reconnecting components, which should be done by a repair professional.`
    } else if (
      lowercaseProblem.includes("button") ||
      lowercaseProblem.includes("key") ||
      lowercaseProblem.includes("press")
    ) {
      solution = `Physical button issues typically require component replacement. A repair technician will need to open your ${deviceType} and replace the affected buttons or switches.`
    } else {
      solution = `Based on your description, this appears to be a hardware issue that requires professional repair. Please visit one of our repair centers for diagnosis and service.`
    }
  }

  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        deviceType,
        problem,
        diagnosis: `Based on the analysis of your ${deviceType} issue: "${problem}", we've determined the following:`,
        solution,
        severity,
      })
    }, 1500)
  })
}

// Initialize localStorage with dummy data if it doesn't exist
export const initializeDummyData = () => {
  // Initialize repair centers
  if (!localStorage.getItem("repairCenters")) {
    localStorage.setItem("repairCenters", JSON.stringify(repairCenters))
  }

  // Initialize users if they don't exist
  if (!localStorage.getItem("users")) {
    const dummyUsers = [
      {
        id: "user_1",
        name: "Demo User",
        email: "user@example.com",
        password: "password123",
        phone: "(555) 123-4567",
        address: "123 User St, Demo City, DC 12345",
      },
    ]
    localStorage.setItem("users", JSON.stringify(dummyUsers))
  }

  // Initialize orders if they don't exist
  if (!localStorage.getItem("orders")) {
    localStorage.setItem("orders", JSON.stringify([]))
  }

  // Initialize chat messages if they don't exist
  if (!localStorage.getItem("chatMessages")) {
    localStorage.setItem("chatMessages", JSON.stringify({}))
  }
}
