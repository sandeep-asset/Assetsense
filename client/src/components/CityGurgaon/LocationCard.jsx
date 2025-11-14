import { FaMapMarkerAlt, FaUsers, FaCheckCircle } from "react-icons/fa";

const LocationCard = ({
  name,
  location,
  image,
  type,
  capacity,
  price,
  features,
}) => {
  return (
    <div className="overflow-hidden bg-white border border-gray-200 rounded-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={`${name} - ${location}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {/* Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1">
          {type === "coworking" ? (
            <FaUsers className="h-3 w-3 text-blue-600" />
          ) : (
            <FaMapMarkerAlt className="h-3 w-3 text-yellow-600" />
          )}
          {type === "coworking" ? "Coworking" : "Virtual Office"}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>

        <div className="flex items-center text-gray-600 mb-3">
          <FaMapMarkerAlt className="h-4 w-4 mr-2 text-gray-400" />
          <span className="text-sm">{location}</span>
        </div>

        {capacity && (
          <div className="flex items-center text-gray-600 mb-3">
            <FaUsers className="h-4 w-4 mr-2 text-gray-400" />
            <span className="text-sm">{capacity}</span>
          </div>
        )}

        <div className="space-y-2 mb-4">
          {features.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-start gap-2">
              <FaCheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-600">{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div>
            <div className="text-2xl font-bold text-blue-600">{price}</div>
            <div className="text-xs text-gray-500">per month</div>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 shadow-sm">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
