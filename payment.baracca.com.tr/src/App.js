import React, { useState } from 'react';
import logo from './logo-black.png';
import './App.css';
import 'antd/dist/antd.css';
import { usePaymentInputs, PaymentInputsWrapper } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import { css } from 'styled-components';
import { Form, Input, Typography, Statistic, Row, Col, Button, Layout, Modal, Breadcrumb } from 'antd';
const { Title } = Typography;
const { Header, Content, Footer } = Layout;

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

const invoices = {
  1111: {
    company: 'Ultra Turizm',
    date: '01.04.2020',
    amount: 300,
    service: "Transfer:	Beijing Airport-Jen Beijing by Shangri-La / Alper Akar	5 Dec 2019"
  },
  2222: {
    company: 'Ultra Turizm',
    date: '31.03.2020',
    amount: 5000,
    service: "Transfer:	Beijing Airport-Jen Beijing by Shangri-La / Alper Akar	5 Dec 2019"
  },
  3333: {
    company: 'Ultra Turizm',
    date: '02.04.2020',
    amount: 1490,
    service: "Transfer:	Beijing Airport-Jen Beijing by Shangri-La / Alper Akar	5 Dec 2019"
  }
};

function App() {
  const [invoiceNo, setInvoiceNo] = useState('');
  const [fetchingInvoice, setFetchingInvoice] = useState(false);
  const [invoice, setInvoice] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalPrivacy, setModalPrivacy] = useState(false);

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');

  const handleChangeCardNumber = e => setCardNumber(e.target.value);
  const handleChangeExpiryDate = e => setExpiryDate(e.target.value);
  const handleChangeCVC = e => setCvc(e.target.value);

  const {
    getCardNumberProps,
    getCardImageProps,
    getExpiryDateProps,
    getCVCProps,
    wrapperProps
  } = usePaymentInputs();

  return (<Layout className="layout">
    <header className="App-header">
      <div className="logo-container">
        <img src={logo} className="App-logo" alt="logo" />
        <Title level={2} style={{ color: '#9b312b' }}>
          payment
          </Title>
      </div>
    </header>

    <Content style={{ padding: '0 50px' }}>

      <div className="content">
        <Form>
          <Form.Item
            hasFeedback
            validateStatus={
              fetchingInvoice
                ? 'validating'
                : invoice === false
                  ? 'error'
                  : undefined
            }
            help={invoice === false ? 'Invoice not found!' : undefined}
          >
            <Input
              size="large"
              type="text"
              name="invoice"
              placeholder="Please enter your invoice number"
              disabled={fetchingInvoice}
              value={invoiceNo}
              onChange={e => {
                const {
                  target: { value }
                } = e;

                setInvoiceNo(value);

                if (value.length >= 4) {
                  setFetchingInvoice(true);

                  sleep(2000).then(() => {
                    const invoice = invoices[value];
                    setFetchingInvoice(false);
                    if (invoice) setInvoice(invoice);
                    else setInvoice(false);
                  });
                }
              }}
            />
          </Form.Item>
        </Form>

        {invoice && (
          <div>
            <Row>
              <Col span={9}>
                <Statistic title="Date" value={invoice.date} />
              </Col>
           
              <Col span={15}>
                <Statistic title="Service" valueStyle={{fontSize: "17px"}} value={invoice.service} />
              </Col>
            </Row>
            <br></br>
            <Row>
              <Col span={10}>
                <Statistic title="Company" value={invoice.company} />
              </Col>
              <Col span={9}>
                <Statistic
                  title="Amount (EUR)"
                  value={invoice.amount}
                  precision={2}
                />
              </Col>
              <Col span={5}>
                <Statistic
                  title="Amount (TRY)"
                  value={invoice.amount * 7.5}
                  precision={2}
                />
              </Col>
            </Row>
            <Row>


              <PaymentInputsWrapper
                {...wrapperProps}
                styles={{
                  fieldWrapper: {
                    base: css`
                    margin-top: 1rem;
                    margin-bottom: 1rem;
                  `
                  },
                  inputWrapper: {
                    base: css`
                    border-color: green;
                  `,
                    errored: css`
                    border-color: maroon;
                  `,
                    focused: css`
                    border-color: unset;
                    box-shadow: unset;
                    outline: 2px solid blue;
                    outline-offset: 2px;
                  `
                  },
                  input: {
                    base: css`
                    color: green;
                  `,
                    errored: css`
                    color: maroon;
                  `,
                    cardNumber: css`
                    width: 16rem;
                  `,
                    expiryDate: css`
                    width: 8rem;
                  `,
                    cvc: css`
                    width: 5rem;
                  `
                  },
                  errorText: {
                    base: css`
                    color: maroon;
                  `
                  }
                }}
              >
                <svg {...getCardImageProps({ images })} />
                <input
                  {...getCardNumberProps({ onChange: handleChangeCardNumber })}
                  value={cardNumber}
                />

                <input
                  {...getExpiryDateProps({ onChange: handleChangeExpiryDate })}
                  value={expiryDate}
                />
                <input
                  {...getCVCProps({ onChange: handleChangeCVC })}
                  value={cvc}
                />
              </PaymentInputsWrapper>
            </Row>
            <Row>
              <Col xs={{ span: 8, offset: 4 }} lg={{ span: 4, offset: 8 }}>
                <Button size="large" style={{ marginTop: 16 }} type="primary" shape="round">
                  Pay ( {invoice.amount * 7.5}??? )
                </Button>
              </Col>
            </Row>
          </div>
        )}
      </div>
    </Content>
    <Footer style={{ right: '0px', left: '0px', bottom: '0px', position: 'fixed', textAlign: 'center' }}>
      <br />Baracca Turizm ve Ticaret Limited ??irketi??2020
      <Button type="link" onClick={() => setModal(true)} >Gizlilik S??zle??mesi</Button>
      <Button type="link" onClick={() => setModalPrivacy(true)} >??ptal ve ??ade Ko??ullar??</Button>
      <p style={{textDecoration:'underline'}}>CONTACT</p>
      <p>
        Address: 8-10D AND Plaza Atasehir, Istanbul, TR
        Email: booking@baracca.com.tr
        Phone: +90 (216) 706 39 36
      </p>
    </Footer>
    <Modal
      title="G??ZL??L??K VE G??VENL??K POL??T??KASI"
      visible={modal}
      footer={null}
      onCancel={() => setModal(false)}
    >
      <p> Firmam??z, ??e??itli ama??larla ki??isel veriler toplayabilir. A??a????da, toplanan ki??isel verilerin nas??l ve ne ??ekilde topland??????, bu verilerin nas??l ve ne ??ekilde korundu??u belirtilmi??tir.

      ??nternet sitemiz ??zerindeki ??e??itli form ve anketlerin doldurulmas?? suretiyle ??yelerin kendileriyle ilgili bir tak??m ki??isel bilgileri (isim-soy isim, firma bilgileri, telefon, adres veya e-posta adresleri gibi) firmam??z taraf??ndan i??in do??as?? gere??i toplanmaktad??r.

      Firmam??z baz?? d??nemlerde m????terilerine ve ??yelerine kampanya bilgileri, yeni ??r??nler hakk??nda bilgiler, promosyon teklifleri g??nderebilir. ??yelerimiz bu gibi bilgileri al??p almama konusunda her t??rl?? se??imi ??ye olurken yapabilir, sonras??nda ??ye giri??i yapt??ktan sonra hesap bilgileri b??l??m??nden bu se??imi de??i??tirilebilir ya da kendisine gelen bilgilendirme iletisindeki linkle bildirim yapabilir.

      Eposta ile ger??ekle??tirilen onay s??recinde, ??yelerimiz taraf??ndan firmam??za elektronik ortamdan iletilen ki??isel bilgiler, ??yelerimiz ile yapt??????m??z "Kullan??c?? S??zle??mesi" ile belirlenen ama??lar ve kapsam d??????nda ??????nc?? ki??ilere a????klanmayacakt??r.

      Sistemle ilgili sorunlar??n tan??mlanmas?? ve verilen hizmet ile ilgili ????kabilecek sorunlar??n veya uyu??mazl??klar??n h??zla ????z??lmesi i??in, firmam??z, ??yelerinin IP adresini kaydetmekte ve bunu kullanmaktad??r. IP adresleri, kullan??c??lar?? genel bir ??ekilde tan??mlamak ve kapsaml?? demografik bilgi toplamak amac??yla da kullan??labilir.

      Firmam??z, ki??isel bilgileri gerekti??inde kullan??c??yla temas kurmak i??in kullan??labilir.

      Firmam??z, gizli bilgileri kesinlikle ??zel ve gizli tutmay??, bunu bir s??r saklama y??k??m?? olarak addetmeyi ve gizlili??in sa??lanmas?? ve s??rd??r??lmesi, gizli bilginin tamam??n??n veya herhangi bir k??sm??n??n kamu alan??na girmesini veya yetkisiz kullan??m??n?? veya ??????nc?? bir ki??iye if??as??n?? ??nlemek i??in gerekli t??m tedbirleri almay?? ve gerekli ??zeni g??stermeyi taahh??t etmektedir.
      
<br />KRED?? KARTI G??VENL??????<br />

Firmam??z, sitemiz ??zerinden al??nan hizmet dahilinde kredi kart?? sahiplerinin g??venli??ini ilk planda tutmaktad??r. Kredi kart?? bilgileriniz hi??bir ??ekilde sistemimizde saklanmamaktad??r.

????lemler s??recine girdi??inizde g??venli bir sitede oldu??unuzu anlamak i??in dikkat etmeniz gereken iki ??ey vard??r. Bunlardan biri taray??c??n??z??n en alt sat??r??nda bulunan bir anahtar ya da kilit simgesidir. Bu g??venli bir internet sayfas??nda oldu??unuzu g??sterir ve her t??rl?? bilgileriniz ??ifrelenerek korunur. Bu bilgiler, ancak sat???? i??lemleri s??recine ba??l?? olarak ve verdi??iniz talimat istikametinde kullan??l??r. Al????veri?? s??ras??nda kullan??lan kredi kart?? ile ilgili bilgiler al????veri?? sitelerimizden ba????ms??z olarak 128 bit SSL (Secure Sockets Layer) protokol?? ile ??ifrelenip sorgulanmak ??zere ilgili bankaya ula??t??r??l??r. Kart??n kullan??labilirli??i onayland?????? takdirde al????veri??e devam edilir. Kartla ilgili hi??bir bilgi taraf??m??zdan g??r??nt??lenemedi??inden ve kaydedilmedi??inden, ??????nc?? ??ah??slar??n herhangi bir ko??ulda bu bilgileri ele ge??irmesi engellenmi?? olur.
Online olarak kredi kart?? ile verilen sipari??lerin ??deme/fatura/teslimat adresi bilgilerinin g??venilirli??i firmam??z taraf??ndan Kredi Kartlar?? Doland??r??c??l??????'na kar???? denetlenmektedir. Bu y??zden, sitemizden ilk defa hizmet sat??n alan m????terilerimizin tedarik ve teslimat a??amas??na gelebilmesi i??in ??ncelikle finansal ve adres/telefon bilgilerinin do??rulu??unun onaylanmas?? gereklidir. Bu bilgilerin kontrol?? i??in gerekirse kredi kart?? sahibi m????teri ile veya ilgili banka ile irtibata ge??ilmektedir.
??ye olurken verdi??iniz t??m bilgilere sadece siz ula??abilir ve siz de??i??tirebilirsiniz. ??ye giri?? bilgilerinizi g??venli korudu??unuz takdirde ba??kalar??n??n sizinle ilgili bilgilere ula??mas?? ve bunlar?? de??i??tirmesi m??mk??n de??ildir. Bu ama??la, ??yelik i??lemleri s??ras??nda 128 bit SSL g??venlik alan?? i??inde hareket edilir. Bu sistem k??r??lmas?? m??mk??n olmayan bir uluslararas?? bir ??ifreleme standard??d??r.

Not: M????teriler taraf??ndan bir hizmet sat??n al??nacak olan firman??n a????k adresinin ve telefonun yer almas??na dikkat edilmesini tavsiye ediyoruz. ??nternet sitesi ??zerinden bir hizmet sat??n alacaksan??z ??ncelikle b??t??n telefon / adres bilgilerini not edin. E??er g??venmiyorsan??z al????veri??ten ??nce telefon ederek teyit edin. Firmam??za ait dair t??m bilgiler ve firma yeri burada belirtilmi??tir.



<br />??????NC?? TARAF WEB S??TELER?? VE UYGULAMALAR<br />

Firmam??z, ??web sitesi dahilinde ba??ka sitelere link verebilir. Firmam??z, bu linkler vas??tas??yla eri??ilen sitelerin gizlilik uygulamalar?? ve i??eriklerine y??nelik herhangi bir sorumluluk ta????mamaktad??r. Firmam??za ait sitede yay??nlanan reklamlar, reklamc??l??k yapan i?? ortaklar??m??z arac??l?????? ile kullan??c??lar??m??za da????t??l??r. ???? bu s??zle??medeki Gizlilik Politikas?? Prensipleri, sadece Ma??azam??z??n kullan??m??na ili??kindir, ??????nc?? taraf web sitelerini kapsamaz.

<br />??ST??SNA?? HALLER<br />
A??a????da belirtilen s??n??rl?? hallerde Firmam??z, i??bu "Gizlilik Politikas??" h??k??mleri d??????nda kullan??c??lara ait bilgileri ??????nc?? ki??ilere a????klayabilir. Bu durumlar s??n??rl?? say??da olmak ??zere;
1.Kanun, Kanun H??km??nde Kararname, Y??netmelik v.b. yetkili hukuki otorite taraf??ndan ????kar??lan ve y??r??rl??l??kte olan hukuk kurallar??n??n getirdi??i zorunluluklara uymak;
2.Yetkili idari ve adli otorite taraf??ndan usul??ne g??re y??r??t??len bir ara??t??rma veya soru??turman??n y??r??t??m?? amac??yla kullan??c??larla ilgili bilgi talep edilmesi;
3.Kullan??c??lar??n haklar?? veya g??venliklerini korumak i??in bilgi vermenin gerekli oldu??u hallerdir.

<br />E-POSTA G??VENL??????<br />
Firmam??z??n m????teri hizmetleri i??in kullan??lan mail adresine herhangi bir sipari??inizle ilgili olarak g??nderece??iniz e-postalarda, asla kredi kart?? numaran??z?? veya ??ifrelerinizi yazmay??n??z. E-postalarda yer alan bilgiler ??????nc?? ??ah??slar taraf??ndan g??r??lebilir. Firmam??z e-postalar??n??zdan aktar??lan bilgilerin g??venli??ini hi??bir ko??ulda garanti edemez.

<br />TARAYICI ??EREZLER??<br />
Firmam??z, sitemizi ziyaret eden kullan??c??lar ve kullan??c??lar??n web sitesini kullan??m?? hakk??ndaki bilgileri teknik bir ileti??im dosyas?? (??erez-Cookie) kullanarak elde edebilir. Bahsi ge??en teknik ileti??im dosyalar??, ana bellekte saklanmak ??zere bir internet sitesinin kullan??c??n??n taray??c??s??na (browser) g??nderdi??i k??????k metin dosyalar??d??r. Teknik ileti??im dosyas?? site hakk??nda durum ve tercihleri saklayarak ??nternet'in kullan??m??n?? kolayla??t??r??r.

Teknik ileti??im dosyas??, ??siteyi ka?? ki??inin ziyaret etti??ini, bir ki??inin siteyi hangi ama??la, ka?? kez ziyaret etti??ini ve ne kadar sitede kald??klar?? hakk??nda istatistiksel bilgileri elde etmeye ve kullan??c??lar i??in ??zel tasarlanm???? kullan??c?? sayfalar??ndan ??dinamik olarak reklam ve i??erik ??retilmesine yard??mc?? olur. Teknik ileti??im dosyas??, ana bellekte veya e-postan??zdan veri veya ba??kaca herhangi bir ki??isel bilgi almak i??in tasarlanmam????t??r. Taray??c??lar??n pek ??o??u ba??ta teknik ileti??im dosyas??n?? kabul eder bi??imde tasarlanm????t??r ancak kullan??c??lar dilerse teknik ileti??im dosyas??n??n gelmemesi veya teknik ileti??im dosyas??n??n g??nderildi??inde uyar?? verilmesini sa??layacak bi??imde ayarlar?? de??i??tirebilirler.

Firmam??z, i??bu "Gizlilik Politikas??" h??k??mlerini diledi??i zaman sitede yay??nlamak veya kullan??c??lara elektronik posta g??ndermek veya sitesinde yay??nlamak suretiyle de??i??tirebilir. Gizlilik Politikas?? h??k??mleri de??i??ti??i takdirde, yay??nland?????? tarihte y??r??rl??k kazan??r.

Gizlilik politikam??z ile ilgili her t??rl?? soru ve ??nerileriniz i??in info@baracca.com.tr adresine email g??nderebilirsiniz. Firmam??za ait a??a????daki ileti??im bilgilerinden ula??abilirsiniz.
<br />
Firma ??nvan??:??Baracca Turizm ve Ticaret Limited ??irketi<br />
Adres:??8-10D AND Plaza Atasehir, Istanbul, TR<br />
Eposta:??booking@baracca.com.tr<br />
Tel: +90 (216) 706 39 36<br />
      </p>

    </Modal>
    <Modal
      title="??PTAL VE ??ADE POL??T??KASI"
      visible={modalPrivacy}
      footer={null}
      onCancel={() => setModalPrivacy(false)}
    >
      <p> Baracca Turizm ve Ticaret Ltd. ??ti.'den sat??n ald??????n??z hizmetin iade ko??ullar??na uymas?? i??in, hizmetin "ay??pl?? hizmet" say??lmas?? gerekmektedir. Kullan??c?? taraf??ndan hizmet sunumunda belirtilen kullan??m ??artlar?? ile hizmet alma y??n??ndeki talimatlara uyulmamas?? durumunda ve hizmete ait ??nceden belirtilen eksiklikler veya uyar??lar durumunda hizmetin "ay??pl?? hizmet??? olarak say??lmayaca????n??n bilinmesi gerekir. Kullan??m ??artlar??na uyulmamas??, hizmet al??m??na ili??kin talimatlara g??re kullan??lmamas?? gibi sebeplerden kaynaklanan iade talepleri kabul edilmemektedir. Sat??n alm???? oldu??unuz hizmet/ler ile ilgili ??u konulara l??tfen dikkat ediniz: M????teri memnuniyetine dair hassasiyetimiz ve ilgili yasalar gere??i, sat??n alm???? oldu??unuz hizmet/leri neden belirtmeksizin iptal yada iade edebilirsiniz. ????lemlerinize ba??lanmas??ndan sonra iptal ve iade talepleriniz ge??erli olamayacakt??r. Hizmetin, Baracca Turizm ve Ticaret Ltd. ??ti. taraf??ndan ay??pl?? ifas?? s??z konusu oldu??undaki iade hakk??n??z ayr??kt??r.  <br />??nemli Not<br />   Hizmetin, Baracca Turizm ve Ticaret Ltd. ??ti. taraf??ndan ay??pl?? ifas?? s??z konusu oldu??unda ise i??lem tarihinden itibaren 7 g??n i??inde taraf??m??za bildirim yap??lmas?? halinde, taraf??n??za fatura kesilmeden ??cret iadesi yap??lacakt??r. Faturalar??m??z, e-fatura olarak hizmet al??m??n?? takip eden 7 g??n i??inde kesildi??inden, hizmet al??m??n?? takiben 7 g??nl??k s??re i??erisinde yapaca????n??z bildirimlerde ??cret iadesi yap??larak fatura kesilmeyecektir. Bu s??reden sonra yap??lan bildirimlerde iade s??z konusu olamayacakt??r.   <br />Para ??adesi ve ??artlar??<br />   Hizmetlerin bizden kaynaklanan nedenlerle ay??pl?? yerine getirilmesi halinde (yukar??daki maddede de belirtildi??i ??ekilde) hizmet tutar??n??n iadesi, taraf??m??za ileti??im kanallar??m??zdan hizmet al??m??n?? takip eden 7 g??n i??inde bildirim yapt??????n??z g??n i??leme al??n??r. Para iadesinin hesab??n??za yans??ma s??resi, bankan??z??n inisiyatifindedir. Sat??n alma a??amas??nda havale ile ger??ekle??tirilen ??demelerin iadesi ise en ge?? 1 hafta i??erisinde m????teri hesab??na yans??maktad??r. Yapt??????n??z ??deme ??ekli ne ise (havale/eft yada kredi kart??) ayn?? yolla para iadesi alabileceksiniz. Taraf??n??za tan??mlanan bonuslardan kulan??lmak suretiyle al??nan hizmetlerde ??cret iadesi s??z konusu de??ildir. </p>
    </Modal>

  </Layout>)

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-container">
          <img src={logo} className="App-logo" alt="logo" />
          <Title level={2} style={{ color: '#9b312b' }}>
            payment
          </Title>
        </div>
      </header>

    </div>
  );
}

export default App;
