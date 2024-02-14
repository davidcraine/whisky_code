require 'csv'
require 'geocoder'

# Input and output file paths
input_file_path = File.join(File.dirname(__FILE__), '../../lib/seeds/distilleries.csv')
output_file_path = File.join(File.dirname(__FILE__), '../../lib/seeds/geocoded_distilleries.csv')
starting_index = ARGV[0].to_i
# Read addresses from input CSV file
wrihte_method = starting_index.zero? ? 'w' : 'a'
CSV.open(output_file_path, wrihte_method) do |out_csv|
  in_csv = CSV.read(input_file_path, headers: true)
  # write the header rows
  out_csv << (in_csv.headers + %w[LATITUDE LONGITUDE])
  in_csv.drop(starting_index).each_with_index do |row, idx|
    puts idx + starting_index
    if !row['ZIP'].empty?
      result = Geocoder.search(row['ZIP']).first
      out_csv << if result
                   (row.fields + [result.latitude, result.longitude])
                 else
                   row.fields + ['', '']
                 end
    else
      out_csv << row.fields + ['', '']
    end
  end
end

puts "Geocoding completed. Output written to #{output_file_path}"
