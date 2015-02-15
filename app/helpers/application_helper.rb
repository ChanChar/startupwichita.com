module ApplicationHelper

  def profile_image(person)
    if person.avatar.exists?
      return person.avatar.url
    elsif person.email.present?
      return avatar_url(person.email)
    else
      return "/assets/missing.png"
    end
  end

  def avatar_url(email)
    default_url = "#{configatron.app_url}/assets/missing.png"
    gravatar_id = Digest::MD5::hexdigest(email).downcase
    "http://gravatar.com/avatar/#{gravatar_id}.png?s=292&r=g&d=#{CGI.escape(default_url)}"
  end

  def owned_by_current_user(person)
    return current_user && current_user.id == person.person_id
  end

  def claimable(person)
    return person.user_id.blank?
  end
end
