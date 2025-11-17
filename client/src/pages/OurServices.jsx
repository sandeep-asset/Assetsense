import {
  FaBuilding,
  FaFileAlt,
  FaGlobe,
  FaPalette,
  FaCheckCircle,
  FaPhone,
  FaUsers,
  FaAward,
  FaArrowRight,
  FaBriefcase,
  FaMapMarkerAlt,
  FaStar,
  FaRocket,
  FaChartLine,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OurServices = () => {
  const navigate = useNavigate();
  const aswServices = [
    {
      title: "GST Registration & MCA Incorporation",
      description:
        "Complete business registration with prime addresses in 40+ cities",
    },
    {
      title: "Corporate Bank Account Opening",
      description: "Streamlined process for opening business banking accounts",
    },
    {
      title: "E-commerce Platform Listings",
      description: "Professional setup for online marketplace presence",
    },
    {
      title: "Professional Business Image",
      description: "Build credibility with established business addresses",
    },
  ];

  const assetSenseServices = [
    {
      icon: FaBuilding,
      title: "Corporate Offices",
      description: "Premium office spaces in prime locations",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Retail & Warehouses",
      description: "Commercial spaces for retail and logistics needs",
    },
    {
      icon: FaFileAlt,
      title: "Legal Documentation",
      description: "Complete assistance from sourcing to registry",
    },
    {
      icon: FaPalette,
      title: "Interior Design",
      description: "Transformative designs that reflect your brand",
    },
  ];

  const whyChooseUs = [
    { stat: "15+", label: "Years of Industry Expertise" },
    { stat: "1500+", label: "Clients Across India" },
    { stat: "50+", label: "Cities Virtual Office Network" },
    { stat: "100%", label: "Transparent Transactions" },
  ];

  // Custom Button Component
  const Button = ({
    children,
    variant = "default",
    size = "default",
    className = "",
    ...props
  }) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";

    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline:
        "border border-input hover:bg-accent hover:text-accent-foreground",
    };

    const sizes = {
      default: "h-10 py-2 px-4",
      lg: "h-11 px-8 rounded-md",
    };

    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

    return (
      <button className={classes} {...props}>
        {children}
      </button>
    );
  };

  // Custom Card Components
  const Card = ({ children, className = "", ...props }) => (
    <div
      className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );

  const CardHeader = ({ children, className = "" }) => (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
      {children}
    </div>
  );

  const CardTitle = ({ children, className = "" }) => (
    <h3
      className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
    >
      {children}
    </h3>
  );

  const CardDescription = ({ children, className = "" }) => (
    <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>
  );

  const CardContent = ({ children, className = "" }) => (
    <div className={`p-6 pt-0 ${className}`}>{children}</div>
  );

  // Custom Badge Component
  const Badge = ({ children, variant = "default", className = "" }) => {
    const variants = {
      default: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    };

    return (
      <span
        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]} ${className}`}
      >
        {children}
      </span>
    );
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white" id="services">
      {/* Hero stats */}
      <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        {/* Hero Background with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80")',
          }}
        >
          <div className="absolute inset-0  backdrop-blur-[1px]"></div>
          <div className="absolute inset-0 bg-gradient-to-br bg-gray-900/70"></div>
        </div>

        {/* Decorative Blurred Circles */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Hero Content */}
          <div className="text-center mb-20 max-w-5xl mx-auto">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/20 shadow-md">
              <FaRocket className="w-4 h-4 text-yellow-400 animate-pulse" />
              <Badge className="text-sm font-semibold bg-yellow-400/20 text-yellow-300 border-yellow-400/30">
                🚀 Transforming Businesses Since 2008
              </Badge>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-8 leading-tight">
              Elevate Your{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Business Presence
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-2xl text-blue-100 mb-12 leading-relaxed font-light max-w-3xl mx-auto">
              Where{" "}
              <span className="font-semibold text-yellow-300">
                Virtual Innovation
              </span>{" "}
              meets{" "}
              <span className="font-semibold text-cyan-300">
                Physical Excellence
              </span>{" "}
              – delivering complete solutions for{" "}
              <strong>
                Virtual Offices, GST Services, Commercial Leasing,
              </strong>{" "}
              and <strong>Interior Design</strong>.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-1 max-w-3xl mx-auto">
              <div className="text-center p-5 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg">
                <div className="text-3xl font-bold text-yellow-400">50+</div>
                <div className="text-sm text-blue-200">Cities Covered</div>
              </div>
              <div className="text-center p-5 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg">
                <div className="text-3xl font-bold text-cyan-400">1500+</div>
                <div className="text-sm text-blue-200">Happy Clients</div>
              </div>
              <div className="text-center p-5 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg">
                <div className="text-3xl font-bold text-green-400">15+</div>
                <div className="text-sm text-blue-200">Years Experience</div>
              </div>
              <div className="text-center p-5 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg">
                <div className="text-3xl font-bold text-purple-400">24/7</div>
                <div className="text-sm text-blue-200">Support</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col pt-5 sm:flex-row gap-5 justify-center items-center">
              <Button
                onClick={() => navigate("/contact")}
                size="lg"
                className="bg-gradient-to-r from-yellow-400 cursor-pointer text-sm to-orange-500 text-blue-900 hover:from-yellow-300 hover:to-orange-400 font-bold px-8 py-4 rounded-full shadow-2xl shadow-yellow-500/25 hover:shadow-yellow-500/40 transition-all duration-300 transform hover:scale-105"
              >
                <FaRocket className="w-5 h-5 mr-2" />
                Launch Your Business Today
              </Button>
              <Button
                onClick={() => navigate("/contact")}
                variant="outline"
                size="lg"
                className="border-2 border-white cursor-pointer text-white text-sm  hover:bg-white hover:text-blue-900 font-bold px-8 py-4 rounded-full backdrop-blur-md hover:shadow-xl transition-all duration-300"
              >
                <FaChartLine className="w-5 h-5 mr-2" />
                Free Growth Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto py-4 px-4">
        {/* Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <Badge className="mb-4 text-sm font-medium bg-blue-100 text-blue-800">
            Our Services
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Our Comprehensive Business & Real Estate Services
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            At our core, we are dedicated to empowering businesses at every
            stage of their journey. We offer a synergistic suite of services
            through two specialized brands:{" "}
            <strong>ASW (Asset Sense Workspaces)</strong> for modern virtual
            solutions, and <strong>Asset Sense</strong> for traditional
            commercial real estate and design.
          </p>
        </div>

        {/* ASW Virtual Office Services */}
        <div className="mb-20">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center">
                <FaGlobe className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                ASW: Virtual Office & GST Solutions
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
                Your gateway to a compliant business presence anywhere in India
                with prime business addresses and comprehensive documentation
                support.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FaFileAlt className="w-5 h-5 text-blue-600" />
                  Virtual Office for GST Registration Solutions
                </h3>
                <p className="text-gray-600 mb-6">
                  Prime business addresses in 40+ cities with full documentation
                  (NOC, rent agreement, etc.) for:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {aswServices.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm"
                    >
                      <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {service.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FaUsers className="w-5 h-5" />
                  End-to-End GST Support (SPOC)
                </h3>
                <p className="mb-4 opacity-90">
                  A dedicated Single Point of Contact to manage GST filings,
                  online applications, and approvals with accuracy and speed.
                </p>
                <Badge className="bg-white/20 text-white border-white/20">
                  Perfect for startups, freelancers, and growing businesses
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Asset Sense Commercial Services */}
        <div className="mb-20">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center">
                <FaBuilding className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                Asset Sense: Commercial Leasing & Interiors
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
                15 years of trust in Gurugram & Delhi-NCR with 500+ clients
                served. Expert Commercial Leasing Gurugram services and Office
                Interior Design solutions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {assetSenseServices.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <div
                      key={index}
                      className="text-center p-6 bg-blue-50 rounded-xl hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="mx-auto mb-4 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {service.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {service.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FaBriefcase className="w-5 h-5 text-blue-600" />
                    Expert Commercial Leasing Services
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <FaCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      Corporate Offices, Retail Shops, Warehouses, Pre-rented
                      Properties
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      Property sourcing, negotiations, and legal documentation
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      Transparent transactions for seamless Business Solutions
                      for Startups and Enterprises
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FaPalette className="w-5 h-5 text-blue-600" />
                    Transformative Interior Design
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <FaCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      Tailored designs that reflect your brand identity
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      Complete solutions from space planning to final execution
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      Inspiring and productive office and retail environments
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Us?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {item.stat}
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    {item.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <CardContent className="p-8 md:p-12 text-center">
            <FaStar className="w-12 h-12 mx-auto mb-6 text-yellow-300" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Your Foundation for Success Starts Here
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Whether you need a Virtual Office in India for GST Registration or
              a Corporate Headquarters with complete Interior Design, we are
              your trusted partner for growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => navigate("/contact")}
                variant="secondary"
                size="lg"
                className="bg-white cursor-pointer text-blue-600 hover:bg-gray-100 text-xs font-semibold"
              >
                <FaPhone className="w-4 h-4 mr-2" />
                Get Started Today
              </Button>
              <Button
                onClick={() => navigate("/contact")}
                variant="outline"
                size="lg"
                className="border-white text-xs cursor-pointer text-white hover:bg-white hover:text-blue-600 font-semibold"
              >
                Book Free Consultation
                <FaArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default OurServices;
