FactoryGirl.define do
  factory :user do
    sequence(:full_name) { |n| "conor mcgregor - #{n}" }
    sequence(:email)    { |n| "conor#{n}@mcgregor.com" }
    password "secret1234"
    password_confirmation "secret1234"
    role User::ROLE_USER

    factory :admin do
      role User::ROLE_ADMIN
    end

    factory :manager do
      role User::ROLE_MANAGER

    end
  end
end

FactoryGirl.define do
  factory :entry do
    time_in_second 3600
    distance_in_metre 18000
    date Date.today
    association :user
  end
end
