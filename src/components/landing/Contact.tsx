import { BASE_URL } from "@/api/FetchInstance";
import { useTranslations } from "@/i18n/useTranslations";
import React, { useState } from "react";

const ContactSection = () => {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSent(false);

    try {
      const response = await fetch(`${BASE_URL}/api/v1.0/offer/store`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.name,
          title: formData.subject,
          description: formData.message,
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSent(true);
        setFormData({ name: "", email: "", subject: "", message: "" }); // Reset form
      } else {
        setError(data.error || t("form_error")); // Use translation
      }
    } catch (err) {
      console.error(err);
      setError(t("form_error")); // Use translation
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="contact section bg-transparent "
    >
      <div className="container section-title" data-aos="fade-up">
        <h2 className="text-black dark:!text-white">
          {t("INNOWEEK")}
        </h2>
        <div className="text-black dark:!text-white">
          {t("CONTACT")}
        </div>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="contact-main-wrapper flex flex-col lg:flex-row gap-8">
          <div className="map-wrapper rounded-lg overflow-hidden border dark:border-gray-700">
            <iframe
              title="CAEx map"
              src="https://maps.google.com/maps?q=41.326772,69.422445&z=16&hl=uz&output=embed"
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="bg-white dark:bg-gray-800 border-0"
            />
          </div>

          <div className="contact-content w-full">
            <div
              className="contact-cards-container grid grid-cols-1 md:grid-cols-2 gap-6"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="contact-card !bg-[#0085d4] dark:!bg-gray-800 dark:text-white rounded-lg shadow p-4">
                <div className="icon-box !bg-[#3b9ded]">
                  <i className="bi bi-geo-alt text-white"></i>
                </div>
                <div className="contact-text">
                  <h4>{t("address_title")}</h4>
                  <p className="text-white">{t("address_value")}</p>
                </div>
              </div>
              <div className="contact-card !bg-[#0085d4] dark:!bg-gray-800 dark:text-white rounded-lg shadow p-4">
                <div className="icon-box !bg-[#3b9ded]">
                  <i className="bi bi-envelope text-white"></i>
                </div>
                <div className="contact-text">
                  <h4>{t("email_title")}</h4>
                  <p className="text-white">innoweek@ilmiy.uz</p>
                </div>
              </div>
              <div className="contact-card !bg-[#0085d4] dark:!bg-gray-800 dark:text-white rounded-lg shadow p-4">
                <div className="icon-box !bg-[#3b9ded]">
                  <i className="bi bi-telephone text-white"></i>
                </div>
                <div className="contact-text">
                  <h4>{t("phone_title")}</h4>
                  <p className="text-white">+998 71 203 32 31</p>
                </div>
              </div>
              <div className="contact-card !bg-[#0085d4] dark:!bg-gray-800 dark:text-white rounded-lg shadow p-4">
                <div className="icon-box !bg-[#3b9ded]">
                  <i className="bi bi-clock text-white"></i>
                </div>
                <div className="contact-text">
                  <h4 className="text-white">{t("working_hours")}</h4>
                  <p className="text-white">09:00 - 18:00</p>
                </div>
              </div>
            </div>
            <div>
              <div
                className="contact-form-container !bg-[#0085d4] dark:!bg-gray-800 dark:text-white rounded-lg shadow p-6 mt-8"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <h3>{t("partnership_title")}</h3>
                <p className="!text-white">{t("partnership_text")}</p>
                <form onSubmit={handleSubmit} className="php-email-form">
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <input
                        type="text"
                        name="name"
                        className="form-control bg-white dark:!bg-gray-700 dark:text-white"
                        id="name"
                        placeholder={t("form_name_placeholder")}
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 form-group mt-3 mt-md-0">
                      <input
                        type="email"
                        className="form-control bg-white dark:!bg-gray-700 dark:text-white"
                        name="email"
                        id="email"
                        placeholder={t("form_email_placeholder")}
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      className="form-control bg-white dark:!bg-gray-700 dark:text-white"
                      name="subject"
                      id="subject"
                      placeholder={t("form_subject_placeholder")}
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group mt-3">
                    <textarea
                      className="form-control text-gray-500 bg-white dark:!bg-gray-700 dark:text-white"
                      name="message"
                      rows={5}
                      placeholder={t("form_message_placeholder")}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <div className="my-3">
                    {loading && <div className="loading">{t("form_loading")}</div>}
                    {error && <div className="error-message">{error}</div>}
                    {sent && (
                      <div className="sent-message">{t("form_sent_message")}</div>
                    )}
                  </div>

                  <div className="form-submit">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-white dark:!bg-gray-700 dark:!text-white dark:hover:!bg-gray-900 text-black px-4 py-2 rounded-full hover:!bg-black hover:!text-white transition-colors duration-300"
                    >
                      {t("form_submit")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
