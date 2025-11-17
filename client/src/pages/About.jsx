import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaAward,
  FaUsers,
  FaBuilding,
  FaCheckCircle,
  FaPhone,
  FaEnvelope,
  FaQuoteLeft,
  FaRocket,
  FaHandshake,
  FaChartLine,
  FaHeadset,
} from "react-icons/fa";

const About = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Add scroll-triggered animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    // Observe all fade-in-up elements
    const animatedElements = document.querySelectorAll(".fade-in-up");
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Custom Button Component
  const Button = ({
    children,
    variant = "default",
    size = "default",
    className = "",
    ...props
  }) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      default:
        "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl",
      secondary:
        "bg-orange-500 text-white hover:bg-orange-600 shadow-lg hover:shadow-xl",
      outline:
        "border-2 border-white text-white hover:bg-white hover:text-blue-600 backdrop-blur-sm",
    };

    const sizes = {
      default: "h-10 py-2 px-4 text-sm",
      lg: "h-12 px-8 py-3 text-lg rounded-lg",
    };

    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

    return (
      <button className={classes} {...props}>
        {children}
      </button>
    );
  };

  // Custom Card Component
  const Card = ({ children, className = "", ...props }) => (
    <div
      className={`rounded-xl bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </div>
  );

  const CardContent = ({ children, className = "" }) => (
    <div className={`p-6 ${className}`}>{children}</div>
  );

  // Custom Badge Component
  const Badge = ({ children, variant = "default", className = "" }) => {
    const variants = {
      default: "bg-blue-100 text-blue-800",
      secondary: "bg-orange-100 text-orange-800",
    };

    return (
      <span
        className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium ${variants[variant]} ${className}`}
      >
        {children}
      </span>
    );
  };

  return (
    <div>
      {/* About Section */}
      <section className="py-20 bg-blue-50/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="fade-in-up">
              <Badge className="mb-4 bg-blue-100 text-blue-800">About US</Badge>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                15+ Years of Excellence in Virtual Office Solutions
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded in 2008 with a vision to revolutionize how businesses
                operate, we've grown from a small startup to India's most
                trusted virtual office provider. Our journey began when
                traditional office spaces seemed limiting for ambitious
                entrepreneurs.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Today, we're proud to have enabled thousands of businesses to
                establish their professional presence across India without the
                overhead costs of physical offices. Every solution we provide is
                crafted with care, innovation, and a deep understanding of
                modern business needs.
              </p>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    10,000+
                  </div>
                  <div className="text-sm text-gray-600">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">40+</div>
                  <div className="text-sm text-gray-600">Cities Covered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">15+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </div>
            </div>
            <div className="fade-in-up">
              <Card className="shadow-xl hover:shadow-2xl border-0">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                    Our Mission
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    To empower businesses of all sizes with flexible,
                    professional, and cost-effective virtual office solutions
                    that enable growth without boundaries.
                  </p>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                    Our Vision
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    To be India's most innovative and customer-centric virtual
                    office provider, setting new standards for business
                    flexibility and professional excellence.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section (Responsive & Broad) */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-6 fade-in-up">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              Our Leadership
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Visionary Leadership Driving Innovation
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
              Meet the entrepreneur shaping the future of real estate through
              artificial intelligence and forward-thinking solutions.
            </p>
          </div>

          {/* Responsive Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* CEO Bio */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  Sandeep Mohan
                </h3>
                <p className="text-xl text-blue-600 font-semibold mb-6">
                  Founder & CEO, Asset Sense
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Sandeep Mohan is a visionary entrepreneur and the driving
                  force behind Asset Sense. With a distinguished career spanning
                  over 25 years, he has built a reputation for creating
                  successful, forward-thinking ventures across the education and
                  real estate sectors.
                </p>
              </div>

              {/* Portfolio Companies */}
              <Card className="border-l-4 border-l-blue-500 shadow-lg">
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                    Entrepreneurial Portfolio
                  </h4>
                  <div className="grid gap-3">
                    <div className="flex items-center gap-3">
                      <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">
                        <strong>Asset Sense:</strong> Flagship real estate
                        venture specializing in commercial leasing
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">
                        <strong>SpeakENG:</strong> Platform dedicated to spoken
                        English for beginners
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">
                        <strong>ASW:</strong> Innovative virtual office
                        solutions provider
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Vision & CTA */}
            <div className="w-full space-y-8 px-4 sm:px-6">
              {/* AI Vision */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 sm:p-8 border border-blue-100 shadow-md w-full">
                <div className="flex flex-col sm:flex-row items-start gap-5">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaRocket className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                      The AI Revolution in Real Estate
                    </h4>
                    <p className="text-gray-700 mb-6 leading-relaxed text-base sm:text-lg">
                      Sandeep firmly believes that the next global revolution
                      will be driven by Artificial Intelligence. He predicts a
                      profound paradigm shift within the real estate industry,
                      asserting that AI will redefine market dynamics and create
                      unprecedented opportunities.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <FaChartLine className="w-4 h-4 text-green-500" />
                        <span className="text-gray-700">
                          New wave of AI-driven millionaires
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaHandshake className="w-4 h-4 text-orange-500" />
                        <span className="text-gray-700">
                          Industry transformation in 5 years
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              {/* Call to Action */}
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Button
                  variant="default"
                  size="sm"
                  className="w-full cursor-pointer sm:flex-1 py-2"
                  onClick={() => navigate("/contact")}
                >
                  <FaHeadset className="w-5 h-5 mr-2" />
                  Connect With Our Vision
                </Button>

                <Button
                  variant="default"
                  size="sm" // instead of "lg"
                  className="w-full sm:flex-1 border-blue-600 py-2 cursor-pointer text-blue-600 hover:bg-blue-600 hover:text-white"
                  onClick={() => navigate("/contact")}
                >
                  Learn More About Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Badge className="mb-4 bg-orange-100 text-orange-800">
            Our Values
          </Badge>
          <h2 className="text-4xl font-bold mb-12 text-gray-900">
            Built on Trust, Driven by Excellence
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-xl hover:shadow-2xl border-0">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaCheckCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  Trust & Reliability
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Every commitment we make is honored. Our clients trust us with
                  their business identity, and we deliver with unwavering
                  reliability.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-xl hover:shadow-2xl border-0">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaAward className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  Innovation
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We continuously evolve our services with cutting-edge
                  technology and forward-thinking solutions for modern
                  businesses.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-xl hover:shadow-2xl border-0">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaUsers className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  Customer First
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Your success is our success. We go above and beyond to ensure
                  every client receives personalized, exceptional service.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
