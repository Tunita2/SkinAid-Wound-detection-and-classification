import { ArrowLeft, Car, Footprints, Bike } from "lucide-react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import "./DirectionsPanel.css";

// Translation map for common direction instructions (English to Vietnamese)
const instructionTranslations: Record<string, string> = {
    // Directions
    "Turn left": "Rẽ trái",
    "Turn right": "Rẽ phải",
    "Turn sharp left": "Rẽ gấp sang trái",
    "Turn sharp right": "Rẽ gấp sang phải",
    "Turn slight left": "Rẽ nhẹ sang trái",
    "Turn slight right": "Rẽ nhẹ sang phải",
    "Keep left": "Đi về phía trái",
    "Keep right": "Đi về phía phải",
    "Continue": "Tiếp tục đi",
    "Continue straight": "Tiếp tục đi thẳng",
    "Go straight": "Đi thẳng",
    "Head": "Đi",
    "Drive": "Lái xe",
    "Walk": "Đi bộ",
    // Prepositions and common words
    " onto ": " vào ",
    " on ": " trên ",
    " to ": " đến ",
    " towards ": " về hướng ",
    " toward ": " về hướng ",
    // Directions
    "north": "hướng Bắc",
    "south": "hướng Nam", 
    "east": "hướng Đông",
    "west": "hướng Tây",
    "northeast": "hướng Đông Bắc",
    "northwest": "hướng Tây Bắc",
    "southeast": "hướng Đông Nam",
    "southwest": "hướng Tây Nam",
    // Roundabout
    "Enter the roundabout": "Đi vào vòng xuyến",
    "Exit the roundabout": "Ra khỏi vòng xuyến",
    "At the roundabout": "Tại vòng xuyến",
    "take the": "đi lối ra",
    "exit": "lối ra",
    "1st exit": "lối ra thứ 1",
    "2nd exit": "lối ra thứ 2", 
    "3rd exit": "lối ra thứ 3",
    "4th exit": "lối ra thứ 4",
    "5th exit": "lối ra thứ 5",
    // Destination
    "Arrive at": "Đến",
    "You have arrived": "Bạn đã đến nơi",
    "Destination": "Điểm đến",
    // U-turn
    "Make a U-turn": "Quay đầu xe",
    "U-turn": "Quay đầu",
    // Merge
    "Merge": "Nhập làn",
    "Merge left": "Nhập làn trái",
    "Merge right": "Nhập làn phải",
};

/**
 * Translate English direction instruction to Vietnamese
 */
const translateInstruction = (instruction: string, currentLang: string): string => {
    if (currentLang !== "vi") {
        return instruction;
    }
    
    let translated = instruction;
    
    // Sort by length (longer phrases first) to avoid partial replacements
    const sortedKeys = Object.keys(instructionTranslations).sort((a, b) => b.length - a.length);
    
    for (const english of sortedKeys) {
        const vietnamese = instructionTranslations[english];
        // Case-insensitive replacement
        const regex = new RegExp(english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        translated = translated.replace(regex, vietnamese);
    }
    
    return translated;
};

interface DirectionsPanelProps {
    startAddress: string;
    endAddress: string;
    duration: string;
    distance: string;
    mode: "drive" | "walk" | "bike";
    steps: Array<{ instruction: string; distance: number; duration: number }>;
    onBack: () => void;
    onModeChange: (mode: "drive" | "walk" | "bike") => void;
}

const DirectionsPanel = ({
    startAddress,
    endAddress,
    duration,
    distance,
    mode,
    steps,
    onBack,
    onModeChange,
}: DirectionsPanelProps) => {
    const { t } = useTranslation();

    return (
        <div className="directions-panel">
            <div className="directions-header">
                <button className="back-btn" onClick={onBack}>
                    <ArrowLeft className="h-6 w-6" />
                </button>
                <div className="route-inputs-container">
                    <div className="route-inputs">
                        <div className="input-row">
                            <div className="input-icon start-icon">
                                <div className="circle-icon" />
                            </div>
                            <input
                                type="text"
                                value={startAddress}
                                readOnly
                                className="route-input"
                                placeholder={t('map.start_point')}
                            />
                        </div>
                        <div className="connector-line">
                            <div className="dots">
                                <span className="dot"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                            </div>
                        </div>
                        <div className="input-row">
                            <div className="input-icon end-icon">
                                <FaMapMarkerAlt className="h-5 w-5 text-red-500" />
                            </div>
                            <input
                                type="text"
                                value={endAddress}
                                readOnly
                                className="route-input"
                                placeholder={t('map.end_point')}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mode-selector">
                <button
                    className={`mode-btn ${mode === "drive" ? "active" : ""}`}
                    onClick={() => onModeChange("drive")}
                >
                    <Car className="h-6 w-6" />
                    <span>{t('map.mode_drive')}</span>
                </button>
                <button
                    className={`mode-btn ${mode === "bike" ? "active" : ""}`}
                    onClick={() => onModeChange("bike")}
                >
                    <Bike className="h-6 w-6" />
                    <span>{t('map.mode_bike')}</span>
                </button>
                <button
                    className={`mode-btn ${mode === "walk" ? "active" : ""}`}
                    onClick={() => onModeChange("walk")}
                >
                    <Footprints className="h-6 w-6" />
                    <span>{t('map.mode_walk')}</span>
                </button>
            </div>

            <div className="route-summary">
                <div className="primary-info">
                    <span className="duration">{duration}</span>
                    <span className="distance">({distance})</span>
                </div>
                <p className="route-via">{t('map.fastest_route')}</p>
            </div>

            <div className="route-steps">
                <h3>{t('map.route_details')}</h3>
                <div className="steps-list">
                    {/* Starting location */}
                    <div className="step-item">
                        <div className="step-icon">
                            <div className="step-circle-icon" />
                        </div>
                        <div className="step-content">
                            <p className="step-instruction">{t('map.start_at')} {startAddress}</p>
                        </div>
                    </div>

                    {/* Intermediate steps */}
                    {steps.map((step, index) => (
                        <div key={index} className="step-item">
                            <div className="step-icon">
                                <div className="step-dot" />
                            </div>
                            <div className="step-content">
                                <p 
                                    className="step-instruction" 
                                    dangerouslySetInnerHTML={{ 
                                        __html: translateInstruction(step.instruction, i18n.language) 
                                    }} 
                                />
                                <p className="step-meta">
                                    {step.distance < 1000 ? `${Math.round(step.distance)} m` : `${(step.distance / 1000).toFixed(1)} km`}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* Destination */}
                    <div className="step-item">
                        <div className="step-icon">
                            <FaMapMarkerAlt className="destination-marker" />
                        </div>
                        <div className="step-content">
                            <p className="step-instruction">{t('map.arrive_at')} {endAddress}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DirectionsPanel;
