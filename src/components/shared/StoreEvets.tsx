"use client";
import { FetchInstance } from "@/api/FetchInstance";
import { UserProfile } from "@/app/[locale]/profile/page";
import { useRouter } from "@/i18n/navigation";
import { IProgramEvent, IResponse } from "@/types";
import { Button, Modal } from "antd";
import { PlusCircleIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface IProps {
  event_data: IProgramEvent;
  size?: "large" | "small" | "middle"
}

const StoreEvets = ({ event_data , size = "middle" }: IProps) => {
  const t = useTranslations('store_events');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { push } = useRouter();

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await FetchInstance<IResponse<UserProfile>>(
        "/api/v1.0/user/me",
        {
          method: "POST",
        }
      );
      if (response) {
        setProfile(response?.data);
      } else {
        setError("Failed to fetch profile data");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  // Tadbirga yozilish funksiyasi
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);

  const handleRegister = async () => {
    setRegisterLoading(true);
    setRegisterError(null);
    try {
      const response = await FetchInstance<IResponse<IProgramEvent>>(
        `/api/v1.0/user/event/store`,
        {
          method: "POST",
          body: JSON.stringify({
            event_id: event_data.id,
            phone_or_email: profile?.phone || profile?.email,
          }),
        }
      );
      if (response && response.success) {
        setRegisterSuccess(true);
      } else {
        setRegisterError("Tadbirga yozilishda xatolik yuz berdi");
      }
    } catch (err) {
      setRegisterError(
        err instanceof Error ? err.message : "Noma'lum xatolik yuz berdi"
      );
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <>
      <Button
        type="primary"
        icon={<PlusCircleIcon className="pt-1" />}
        onClick={() => {
          setIsModalVisible(true);
          fetchProfile();
        }}
        size={size}
      >
        {t('register_event')}
      </Button>

      <Modal
        title={
          registerSuccess
            ? t('success')
            : event_data.title || t('detail')
        }
        open={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        footer={
          registerSuccess
            ? [
                <Button
                  key="ok"
                  type="primary"
                  onClick={() => setIsModalVisible(false)}
                >
                  {t('close')}
                </Button>,
              ]
            : [
                <>
                  {!profile && !loading ? (
                    <span style={{ marginTop: 16 }}>
                      <p style={{ color: "orange", marginBottom: 8 }}>
                        {t('login_required')}
                      </p>
                      <Button
                        type="default"
                        onClick={() => {
                          push("/login");
                        }}
                        style={{ marginRight: 8 }}
                      >
                        {t('enter')}
                      </Button>
                      <Button
                        type="link"
                        onClick={() => {
                          push("/register");
                        }}
                      >
                       {t('register')}
                      </Button>
                    </span>
                  ) : (
                    <Button
                      key="register"
                      type="primary"
                      loading={registerLoading}
                      onClick={handleRegister}
                    >
                      {t('register_event')}
                    </Button>
                  )}
                </>,
                <Button key="cancel" onClick={() => setIsModalVisible(false)}>
                  {t('cancel')}
                </Button>,
              ]
        }
      >
        {registerSuccess ? (
          <p>{t('registration_successful')}</p>
        ) : (
          <>
            {event_data.date && (
              <p>
                <b>{t('date_and_time_of_visit')}:</b> {event_data.date}
              </p>
            )}
            {event_data.address && (
              <p>
                <b>{t('address')}:</b> {event_data.address}
              </p>
            )}
            {event_data?.started_at && (
              <p>
                <b>{t('start_time')}:</b> {event_data.started_at}
              </p>
            )}
            {event_data?.stopped_at && (
              <p>
                <b>{t('end_time')}:</b> {event_data.stopped_at}
              </p>
            )}
            {event_data.description && (
              <p>
                <b>{t('description')}:</b> {event_data.description}
              </p>
            )}
            {registerError && <p style={{ color: "red" }}>{registerError}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
          </>
        )}
      </Modal>
    </>
  );
};

export default StoreEvets;
