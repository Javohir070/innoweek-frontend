import { useTranslations } from "next-intl";
import React from "react";

const ContactSection = () => {
  const t = useTranslations('contact');
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.1766398490977!2d69.42026617659344!3d41.32677217130777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef716040d8001%3A0xaf24862e6ceb4cb5!2sCAEx%20(Central%20Asian%20Expocenter)!5e0!3m2!1sru!2s!4v1751562905394!5m2!1sru!2s"
              width="100%"
              height="100%"
              loading="lazy"
              className="bg-white dark:bg-gray-800"
            ></iframe>
          </div>

          <div className="contact-content w-full">
            <div
              className="contact-cards-container grid grid-cols-1 md:grid-cols-2 gap-6"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="contact-card !bg-[#3b82f6] dark:!bg-gray-800 dark:text-white rounded-lg shadow p-4">
                <div className="icon-box">
                  <i className="bi bi-geo-alt"></i>
                </div>
                <div className="contact-text">
                  <h4>{t("address_title")}</h4>
                  <p className="text-white">{t("address_value")}</p>
                </div>
              </div>
              <div className="contact-card !bg-[#3b82f6] dark:!bg-gray-800 dark:text-white rounded-lg shadow p-4">
                <div className="icon-box">
                  <i className="bi bi-envelope"></i>
                </div>
                <div className="contact-text">
                  <h4>{t("email_title")}</h4>
                  <p className="text-white">info@innoweek.uz</p>
                </div>
              </div>
              <div className="contact-card !bg-[#3b82f6] dark:!bg-gray-800 dark:text-white rounded-lg shadow p-4">
                <div className="icon-box">
                  <i className="bi bi-telephone !text-[#3256ca]"></i>
                </div>
                <div className="contact-text">
                  <h4>{t("phone_title")}</h4>
                  <p className="text-white">+998 71 203 32 00</p>
                </div>
              </div>
              <div className="contact-card !bg-[#3b82f6] dark:!bg-gray-800 dark:text-white rounded-lg shadow p-4">
                <div className="icon-box">
                  <i className="bi bi-clock"></i>
                </div>
                <div className="contact-text">
                  <h4 className="text-white">{t("working_hours")}</h4>
                  <p className="text-white">09:00 - 18:00</p>
                </div>
              </div>
            </div>
            <div>
              <div
                className="contact-form-container !bg-[#3b82f6] dark:!bg-gray-800 dark:text-white rounded-lg shadow p-6 mt-8"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <h3>{t("partnership_title")}</h3>
                <p className="!text-white">{t("partnership_text")}</p>
                <form
                  action="forms/contact.php"
                  method="post"
                  className="php-email-form"
                >
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <input
                        type="text"
                        name="name"
                        className="form-control bg-white dark:!bg-gray-700 dark:text-white"
                        id="name"
                        placeholder={t("form_name_placeholder")}
                      />
                    </div>
                    <div className="col-md-6 form-group mt-3 mt-md-0">
                      <input
                        type="email"
                        className="form-control bg-white dark:!bg-gray-700 dark:text-white"
                        name="email"
                        id="email"
                        placeholder={t("form_email_placeholder")}
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
                    />
                  </div>
                  <div className="form-group mt-3">
                    <textarea
                      className="form-control text-gray-500 bg-white dark:!bg-gray-700 dark:text-white"
                      name="message"
                      rows={5}
                      placeholder={t("form_message_placeholder")}
                    ></textarea>
                  </div>

                  <div className="my-3">
                    <div className="loading">{t("form_loading")}</div>
                    <div className="error-message"></div>
                    <div className="sent-message">
                      {t("form_sent_message")}
                    </div>
                  </div>

                  <div className="form-submit">
                    <button
                      type="submit"
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
