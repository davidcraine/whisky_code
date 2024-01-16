FactoryBot.define do
  factory :distillery do
    transient do
      shared_name { Faker::Name.name }
    end

    operating_name { shared_name }
    owner_name { shared_name }
    permit_number { Faker::Number.number }
    street { Faker::Address.street_address }
    city { Faker::Address.city }
    state { Faker::Address.state }
    zip { Faker::Address.zip_code }
  end
end
