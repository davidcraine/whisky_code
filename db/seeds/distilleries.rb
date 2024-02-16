require 'csv'

Distillery.transaction do
  csv_path = File.path(Rails.root.join('lib', 'seeds', 'geocoded_distilleries.csv'))
  CSV.foreach(csv_path, headers: true) do |row|
    Distillery.create(
      row.to_h.transform_keys { |key| key.downcase.parameterize(separator: '_') }
    )
  end
end
