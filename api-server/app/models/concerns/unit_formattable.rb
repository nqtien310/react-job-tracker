module UnitFormattable
  extend ActiveSupport::Concern

  def formatted_distance
    if distance_in_metre < 1000
      "#{distance_in_metre.to_i} m"
    else
      "#{distance_in_metre/1000.0} km"
    end
  end

  def formatted_speed
    "#{(speed * 3.6).round(1)} km/h"
  end
end
