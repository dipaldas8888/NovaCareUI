"use client";

import { useState, useEffect } from "react";
import { doctorAPI } from "../services/api";
import { useApp } from "../context/AppContext";
import {
  Phone,
  Mail,
  Clock,
  Users,
  Search,
  Filter,
  Heart,
  Brain,
  Eye,
  Bone,
  Baby,
  Stethoscope,
  Activity,
  Pill,
  Scissors,
  Shield,
  Star,
  Calendar,
  ChevronDown,
  X,
  User,
} from "lucide-react";

const getSpecializationIcon = (specialization) => {
  const iconMap = {
    cardiology: Heart,
    neurology: Brain,
    ophthalmology: Eye,
    orthopedics: Bone,
    pediatrics: Baby,
    "general medicine": Stethoscope,
    "internal medicine": Activity,
    pharmacy: Pill,
    surgery: Scissors,
    immunology: Shield,
    dermatology: User,
    psychiatry: Brain,
    radiology: Activity,
    oncology: Shield,
    gynecology: Heart,
    urology: Activity,
    ent: Eye,
    dentistry: User,
  };

  const key = specialization.toLowerCase().replace(/\s+/g, " ");
  return iconMap[key] || Stethoscope;
};

const DoctorCard = ({ doctor, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const SpecializationIcon = getSpecializationIcon(doctor.specialization);

  return (
    <div
      className="group relative bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-700/50 hover:border-gray-600/50"
      style={{
        animationDelay: `${index * 50}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative p-5">
        <div className="flex items-center space-x-3 mb-4">
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md transform transition-all duration-300 group-hover:scale-110">
              <span className="text-lg font-bold text-white">
                {doctor.name.charAt(0)}
              </span>
            </div>

            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-white mb-1 truncate group-hover:text-blue-300 transition-colors duration-300">
              Dr. {doctor.name}
            </h3>
            <div className="flex items-center space-x-2">
              <SpecializationIcon className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <p className="text-blue-400 font-medium text-sm truncate">
                {doctor.specialization}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-gray-300 text-sm font-medium">4.8</span>
          </div>
        </div>

        <div className="space-y-3">
          <InfoItem icon={Phone} text={doctor.contactNumber} isCompact />
          <InfoItem icon={Mail} text={doctor.email} isCompact />
          <InfoItem icon={Clock} text={doctor.schedule} isCompact />
          <InfoItem
            icon={Users}
            text={`${doctor.maxPatientsPerDay} patients/day`}
            isCompact
          />
        </div>

        <div className="mt-4 pt-4 border-t border-gray-700/50">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-gray-800/50 rounded-lg p-2">
              <div className="text-lg font-bold text-blue-400">5+</div>
              <div className="text-xs text-gray-400">Years</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-2">
              <div className="text-lg font-bold text-green-400">200+</div>
              <div className="text-xs text-gray-400">Patients</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-2">
              <div className="text-lg font-bold text-purple-400">98%</div>
              <div className="text-xs text-gray-400">Success</div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between p-2 bg-green-900/20 rounded-lg border border-green-500/20">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-medium text-sm">
                Available
              </span>
            </div>
            <Calendar className="w-4 h-4 text-green-400" />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-500/30 transition-all duration-300 pointer-events-none"></div>
    </div>
  );
};

const InfoItem = ({ icon: Icon, text, isCompact = false }) => (
  <div className="flex items-center space-x-3">
    <div className="flex-shrink-0">
      <div className="w-8 h-8 bg-gray-700/50 rounded-lg flex items-center justify-center">
        <Icon className="w-4 h-4 text-gray-400" />
      </div>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-gray-300 text-sm font-medium truncate">{text}</p>
    </div>
  </div>
);

const LoadingCard = ({ index }) => (
  <div
    className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl p-5 border border-gray-700/50 animate-pulse"
    style={{ animationDelay: `${index * 50}ms` }}
  >
    <div className="flex items-center space-x-3 mb-4">
      <div className="w-12 h-12 bg-gray-700 rounded-lg"></div>
      <div className="flex-1">
        <div className="h-5 bg-gray-700 rounded mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-2/3"></div>
      </div>
      <div className="w-8 h-4 bg-gray-700 rounded"></div>
    </div>
    <div className="space-y-3">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-700 rounded-lg"></div>
          <div className="flex-1 h-4 bg-gray-700 rounded"></div>
        </div>
      ))}
    </div>
    <div className="mt-4 pt-4 border-t border-gray-700">
      <div className="grid grid-cols-3 gap-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gray-700 rounded-lg h-12"></div>
        ))}
      </div>
    </div>
  </div>
);

const Doctors = () => {
  const { doctors, setDoctors, loading, setLoading, error, setError } =
    useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await doctorAPI.getAll();
      setDoctors(response.data);
    } catch (err) {
      setError("Failed to fetch doctors. Please try again later.");
      console.error("Error fetching doctors:", err);
    } finally {
      setLoading(false);
    }
  };

  const specializations = [
    ...new Set(doctors.map((doctor) => doctor.specialization)),
  ];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization =
      !selectedSpecialization ||
      doctor.specialization === selectedSpecialization;
    return matchesSearch && matchesSpecialization;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSpecialization("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <div className="h-10 bg-gray-700 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-700 rounded-lg w-96 mx-auto animate-pulse"></div>
          </div>

          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="flex-1 h-12 bg-gray-700 rounded-xl animate-pulse"></div>
            <div className="md:w-64 h-12 bg-gray-700 rounded-xl animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <LoadingCard key={index} index={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-blue-600/10 border border-blue-500/20 rounded-full px-4 py-2 mb-4">
            <Stethoscope className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 font-medium text-sm">
              Medical Team
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4">
            Our Doctors
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Meet our team of experienced medical professionals dedicated to
            providing exceptional healthcare services.
          </p>
        </div>

        <div className="mb-8">
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search doctors by name or specialization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div className="md:w-64 relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                  className="w-full pl-10 pr-8 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="">All Specializations</option>
                  {specializations.map((spec) => (
                    <option key={spec} value={spec} className="bg-gray-800">
                      {spec}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>

              {(searchTerm || selectedSpecialization) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-3 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded-lg text-red-400 font-medium transition-all duration-300 flex items-center space-x-2"
                >
                  <X className="w-4 h-4" />
                  <span>Clear</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-8 bg-red-900/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl">
            <div className="flex items-center justify-between">
              <span>{error}</span>
              <button
                onClick={fetchDoctors}
                className="text-red-400 hover:text-red-300 underline hover:no-underline transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {!loading && filteredDoctors.length > 0 && (
          <div className="mb-6 text-center">
            <p className="text-gray-400">
              Showing{" "}
              <span className="text-blue-400 font-semibold">
                {filteredDoctors.length}
              </span>
              {filteredDoctors.length === 1 ? " doctor" : " doctors"}
            </p>
          </div>
        )}

        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDoctors.map((doctor, index) => (
              <div
                key={doctor.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <DoctorCard doctor={doctor} index={index} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              No doctors found
            </h3>
            <p className="text-gray-400 mb-4">
              {searchTerm || selectedSpecialization
                ? "Try adjusting your search criteria."
                : "No doctors are currently available."}
            </p>
            {(searchTerm || selectedSpecialization) && (
              <button
                onClick={clearFilters}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.4s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Doctors;
