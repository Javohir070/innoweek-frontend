"use client";
import { FetchInstance } from "@/api/FetchInstance";
import { UserProfile } from "@/app/[locale]/profile/page";
import { useRouter } from "@/i18n/navigation";
import { IProgramEvent, IResponse } from "@/types";
import { Button, Modal } from "antd";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";

interface IProps {
  btn_text: string;
  event_data: IProgramEvent;
}

const StoreEvets = ({ btn_text, event_data }: IProps) => {
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
      >
        {btn_text}
      </Button>

      <Modal
        title={
          registerSuccess
            ? "Muvaffaqiyatli!"
            : event_data.title || "Tadbir tafsilotlari"
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
                  OK
                </Button>,
              ]
            : [
                <>
                  {!profile && !loading ? (
                    <span style={{ marginTop: 16 }}>
                      <p style={{ color: "orange", marginBottom: 8 }}>
                        Tadbirga yozilish uchun profilingizga kirish kerak
                      </p>
                      <Button
                        type="default"
                        onClick={() => {
                          push("/login");
                        }}
                        style={{ marginRight: 8 }}
                      >
                        Kirish
                      </Button>
                      <Button
                        type="link"
                        onClick={() => {
                          push("/register");
                        }}
                      >
                        {"Ro'yxatdan o'tish"}
                      </Button>
                    </span>
                  ) : (
                    <Button
                      key="register"
                      type="primary"
                      loading={registerLoading}
                      onClick={handleRegister}
                    >
                      Tadbirga yozilish
                    </Button>
                  )}
                </>,
                <Button key="cancel" onClick={() => setIsModalVisible(false)}>
                  Bekor qilish
                </Button>,
              ]
        }
      >
        {registerSuccess ? (
          <p>Tadbirga muvaffaqiyatli yozildingiz!</p>
        ) : (
          <>
            {event_data.date && (
              <p>
                <b>Sana:</b> {event_data.date}
              </p>
            )}
            {event_data.address && (
              <p>
                <b>Manzil:</b> {event_data.address}
              </p>
            )}
            {event_data?.started_at && (
              <p>
                <b>Boshlanish vaqti:</b> {event_data.started_at}
              </p>
            )}
            {event_data?.stopped_at && (
              <p>
                <b>Tugash vaqti:</b> {event_data.stopped_at}
              </p>
            )}
            {event_data.description && (
              <p>
                <b>Tavsif:</b> {event_data.description}
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
