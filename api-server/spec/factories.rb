FactoryGirl.define do
  factory :user do
    sequence(:full_name) { |n| "conor mcgregor - #{n}" }
    sequence(:email)    { |n| "conor#{n}@mcgregor.com" }
    password "secret1234"
    role User::ROLE_USER

    factory :admin do
      role User::ROLE_ADMIN
    end

    factory :manager do
      role User::ROLE_MANAGER

    end
  end
end
