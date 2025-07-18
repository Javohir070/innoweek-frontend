import React from "react";

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="contact section bg-transparent "
    >
      <div className="container section-title" data-aos="fade-up">
        <h2 className="text-black dark:!text-white" data-uz="INNOWEEK" data-ru="INNOWEEK" data-en="INNOWEEK">
          {"INNOWEEK"}
        </h2>
        <div className="text-black dark:!text-white" data-uz="BOG'LANISH" data-ru="СВЯЗАТЬСЯ" data-en="CONTACT">
          {"BOG'LANISH"}
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
                  <h4 data-uz="Manzil" data-ru="Адрес" data-en="Address">Manzil</h4>
                  <p className="text-white" data-uz="Mirzo Ulugʻbek tumani, Milliy Bogʻ ko‘chasi, 1-uy" data-ru="..." data-en="...">
                    Mirzo Ulugʻbek tumani, Milliy Bogʻ ko‘chasi, 1-uy
                  </p>
                </div>
              </div>
              <div className="contact-card !bg-[#3b82f6] dark:!bg-gray-800 dark:text-white rounded-lg shadow p-4">
                <div className="icon-box">
                  <i className="bi bi-envelope"></i>
                </div>
                <div className="contact-text">
                  <h4 data-uz="Pochta" data-ru="Почта" data-en="Email">Pochta</h4>
                  <p className="text-white">info@innoweek.uz</p>
                </div>
              </div>
              <div className="contact-card !bg-[#3b82f6] dark:!bg-gray-800 dark:text-white rounded-lg shadow p-4">
                <div className="icon-box">
                  <i className="bi bi-telephone !text-[#3256ca]"></i>
                </div>
                <div className="contact-text">
                  <h4 data-uz="Telefon" data-ru="Телефон" data-en="Phone">Telefon</h4>
                  <p className="text-white">+998 71 203 32 00</p>
                </div>
              </div>
              <div className="contact-card !bg-[#3b82f6] dark:!bg-gray-800 dark:text-white rounded-lg shadow p-4">
                <div className="icon-box">
                  <i className="bi bi-clock"></i>
                </div>
                <div className="contact-text">
                  <h4 className="text-white" data-uz="Ish vaqti" data-ru="Время работы" data-en="Working hours">Ish vaqti</h4>
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
                <h3
                  data-uz="Hamkorlik uchun"
                  data-ru="Для партнёрства"
                  data-en="For partnership"
                >Hamkorlik uchun</h3>
                <p
                className="!text-white"
                  data-uz="Biz homiylik imkoniyatlarini nafaqat ishtirokchilar uchun, kompaniyalar uchun ham taklif etamiz, bu esa tadbirning tijoriy salohiyatini maksimal darajada oshirishga xizmat qiladi."
                  data-ru="Мы предлагаем возможности спонсорства не только для участников, но и для компаний, не участвующих в мероприятии, чтобы максимально увеличить коммерческий потенциал мероприятия."
                  data-en="We offer sponsorship opportunities not only for participants but also for companies not participating to maximize the commercial potential of the event."
                >
                  {"Biz homiylik imkoniyatlarini nafaqat ishtirokchilar uchun, kompaniyalar uchun ham taklif etamiz, bu esa tadbirning tijoriy salohiyatini maksimal darajada oshirishga xizmat qiladi."}
                </p>

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
                        placeholder="Ismingiz"
                        data-uz="Ismingiz"
                        data-ru="Ваше Имя"
                        data-en="Your Name"
                      />
                    </div>
                    <div className="col-md-6 form-group mt-3 mt-md-0">
                      <input
                        type="email"
                        className="form-control bg-white dark:!bg-gray-700 dark:text-white"
                        name="email"
                        id="email"
                        placeholder="Mail pochtangiz"
                        data-uz="Mail pochtangiz"
                        data-ru="Ваш email"
                        data-en="Your email"
                      />
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      className="form-control bg-white dark:!bg-gray-700 dark:text-white"
                      name="subject"
                      id="subject"
                      placeholder="Taklif nomi"
                      data-uz="Taklif nomi"
                      data-ru="Введите Тему"
                      data-en="Enter Subject"
                    />
                  </div>
                  <div className="form-group mt-3">
                    <textarea
                      className="form-control text-gray-500 bg-white dark:!bg-gray-700 dark:text-white"
                      name="message"
                      rows={5}
                      placeholder="Taklif kiriting"
                      data-uz="Taklif kiriting"
                      data-ru="Введите Сообщение"
                      data-en="Enter Message"
                    ></textarea>
                  </div>

                  <div className="my-3">
                    <div className="loading">Loading</div>
                    <div className="error-message"></div>
                    <div className="sent-message">
                      Your message has been sent. Thank you!
                    </div>
                  </div>

                  <div className="form-submit">
                    <button
                      type="submit"
                      data-uz="RO'YHATDAN O'TISH"
                      data-ru="Отправить сообщение"
                      data-en="Send Message"
                      className="bg-blue-600 dark:bg-gray-700 text-white px-4 py-2 rounded"
                    >
                      {"RO'YHATDAN O'TISH"}
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
