import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/layers/Header';

const Rules = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header onBack={() => navigate(-1)}/>
      <main className="privacyMain">
        <h1>قوانین و شرایط استفاده</h1>
        <p>


          کاربر گرامی، با توجه به این که نرم‌افزار “نیلمان” سرویس های آرایشگاهی به بانوان را تحت شرایط و مقررات ذیل ارائه می‌نماید، ضرورت دارد پیش از نصب یا استفاده از این نرم‌افزار، سند حاضر را به دقت مطالعه فرمائید و در صورت موافقت، مبادرت به نصب و استفاده از آن نمائید. بدیهی است استفاده شما از این نرم‌افزار به منزله قبول تمامی شرایط و مقررات ذیل به عنوان قرارداد الزام‌‌آور فیمابین خواهد بود.
          ‎ماده ۱: تعاریف

          در این سند، واژگان و اصطلاحات به کار رفته، واجد معانی به شرح ذیل هستند؛
          ‎۱-۱- شرکت: شرکت زیبا گستر سبز وارنا که با نام تجاری نیلمان، خدمات نرم‌‌افزاری و برخط در حوزه سرویس‌های آرایشگاهی و زیبایی ارائه می‌دهد.
          ‎۲-۱- نیلمان: خدمات نرم‌افزاری است که شرکت با استفاده از آن ، بانوان متقاضی استفاده از سرویس‌های آرایشگاهی را به آرایشگران طرف قرارداد ارائه سرویس متصل می‌نماید.
          ‎۳-۱- سامانه نیلمان: مجموعه امکانات نرم‌افزاری شرکت شامل و نه محدود به اپلیکیشن نیلمان می‌باشد که کلیه حقوق مادی و معنوی آن متعلق به شرکت می‌باشد.
          ‎۴-۱- سرویس‌های آرایشگاهی: منظور خدمات آرایشگاهی متداول در سالن‌های زیبایی بانوان است که در دسته‌های مختلف در سامانه نیلمان به متقاضیان استفاده از این خدمات نمایش داده می‌شود و از جمله شامل خدمات زیبایی مربوط به ناخن، مو، مژه و ابرو، آرایش صورت، خدمات سلامتی مربوط به پوست، ماساژ و … است.
          ‎۵-۱- کاربر متقاضی: شخص یا اشخاص حقیقی خانم که با استفاده از سامانه نیلمان، سرویس‌های آرایشگاهی را به صورت انفرادی یا گروهی درخواست می‌نمایند. این درخواست‌ها می تواند به صورت رزرو وقت و اعزام زیباکار به محل باشد.
          ‎۶-۱- کاربر زیباکار: منظور متخصص امور زیبایی است که به صورت مستقل به ارائه سرویس های زیبایی و آرایشگاهی می‌پردازد و با ثبت نام در سامانه نیلمان و عقد قرارداد،متقاضی دریافت درخواست‌های ارسالی از سوی کاربران متقاضی است.
          ‎۷-۱- کاربران: مجموعه اشخاص حقیقی یا حقوقی اعم از کاربر متقاضی و کاربر زیباکار است که متقاضی استفاده از نیلمان هستند.
          ‎۸-۱- حساب کاربری: منظور حسابی است که کاربران برای استفاده از نیلمان می‌بایست مطابق شرایط مورد نظر شرکت در نرم‌افزار ایجاد نمایند.
          ‎۱۰-۱- حق استفاده و بهره‌برداری از نرم‌افزار: مبلغی است که کاربر زیباکار در برابر استفاده از سامانه نیلمان برای یافتن متقاضی و دریافت درخواست‌ها به شرکت پرداخت می‌نمایند.

          ‎ماده ۲ : حساب کاربری

          ‎۱-۲- کاربران برای استفاده از سامانه نیلمان می‌بایست نسبت به ایجاد حساب کاربری با لحاظ شرایط ذیل اقدام نمایند:
          * دارا بودن حداقل ۱۸ سال تمام
          * تکمیل فرم مشخصات مشتمل بر نام، نام خانوادگی ، شماره ملی و شماره تلفن همراه به نام کاربران متقاضی و همچنین درج آدرس و لوکیشن دقیق
          * تکمیل فرم مشخصات مشتمل بر نام، نام خانوادگی، کد ملی، آدرس و شماره تلفن همراه برای کاربران زیباکار و همچنین عقدقرارداد
          * بارگذاری مدارک و مجوزها برای کاربران زیباکار حسب موارد مقرر در سامانه نیلمان
          ‎تبصره: در صورتی که در مواقع خاص شرکت به اطلاعات تکمیلی دیگری نیازمند باشد، کاربران موظف به همکاری خواهند بود.
          ‎۲-۲- هر کاربر مجاز به ایجاد فقط یک حساب کاربری در سامانه نیلمان خواهد بود.
          ‎۳-۲- کاربران با ایجاد حساب کاربری، مسئولیت صحت اطلاعات وارده را به عهده می‌گیرند و متعهد می‌گردند در صورت هر گونه تغییر، نسبت به روز رسانی این اطلاعات در سامانه نیلمان اقدام نمایند ؛در غیر اینصورت مسئولیتی متوجه نیلمان نخواهد بود.
          ‎۴-۲- مسئولیت تمامی فعالیت‌های صورت‌گرفته از یک حساب کاربری با صاحب آن می‌باشد لذا انتقال حساب کاربری به دیگر اشخاص مطلقا ممنوع می‌باشد. همچنین ضروری است در صورتی که کاربران ظن دسترسی اشخاص ثالث به رمز عبور خود را داشته باشند یا در مواقعی همچون سرقت گوشی موبایل یا سرقت رمز عبور و مانند آن، سریعا نسبت به اطلاع‌رسانی موضوع به شرکت اقدام کرده و حساب کاربری خود را مسدود نمایند.

          ‎ماده ۳: هزینه استفاده از خدمات

          ‎۱-۳- هزینه سرویس‌های آرایشگاهی و زیبایی به تفکیک و به صورت مقطوع در سامانه نیلمان معین شده و به کاربران به شرح ذیل نمایش داده می‌شود:

          * هزینه سرویس توسط سامانه نیلمان بر اساس شاخص‌هایی چون متوسط قیمت برای خدمت مورد نظر محاسبه و پیش از سفارش به کاربر متقاضی نمایش داده می شود.
          ‎تبصره: در صورت اعزام زیباکار به محل، هزینه ایاب و ذهاب به هزینه سرویس افزوده می‌شود.
          ‎۲-۳- حق استفاده و بهره‌برداری از سامانه نیلمان حسب مورد و بر اساس قراردادهای منعقده با زیباکاران محاسبه و توسط ایشان به شرکت پرداخت می‌گردد.
          ‎تبصره: برای تسهیل امور، شرکت به وکالت از کاربران زیباکار هزینه سرویس‌های آرایشگاهی و زیبایی را از کاربر متقاضی دریافت و پس از کسر حق استفاده و بهره‌برداری خود، الباقی را به حساب معرفی شده از سوی زیباکار واریز می‌کند.
          ‎۳-۳- زیباکار به موجب شرایط استفاده حاضر به شرکت اختیار می‌دهد حق استفاده و بهره داری از سامانه نیلمان را در طول زمان تغییر دهد. این تغییر از طریق سامانه نیلمان بصورت کتبی به زیباکار اطلاع رسانی می شود.
          ‎۴-۳- کاربر متقاضی می‌تواند هزینه سرویس دریافتی خود را فقط به روش اعتباری و از طریق درگاه پرداخت معرفی شده در سامانه نیلمان پرداخت نماید و زیباکار نمی‌تواند کاربر متقاضی را به انجام پرداخت نقدی اجبارنماید.
          تبصره: در صورت پرداخت هرگونه وجه اضافی و یا خدمات اضافه اعم از پرداخت نقدی، کارت به کارت و … توسط کاربر متقاضی به زیباکار،شرکت هیچ گونه مسئولیتی در این زمینه جهت طرح دعوی و یا عودت وجه نخواهد داشت.
          ‎۵-۳- شرکت حسب سیاست‌های خود ممکن است بدون
          ‎دریافت وجهی، بسته‌های تشویقی برای کاربران در قالب پاداش، جایزه، کد تخفیف و مانند آن در نظر بگیرد. با انقضای تاریخ اعتبار این بسته‌ها یا در صورت کشف موارد تخلف یا سواستفاده از این مشوق‌ها، شرکت می‌تواند به صورت یک طرفه این بسته‌های تشویقی را لغو یا باطل نماید و کاربران حق هرگونه اعتراضی را در این خصوص از خود سلب می نمایند.

          ‎ماده ۴ : حقوق و مسئولیت های زیباکار

          ‎۱-۴- در صورتی که کاربر متقاضی برای انجام سفارش خود نسبت به ثبت سفارش اقدام می نماید، زیباکار ملزم است همان مبلغ تعیین و پرداخت شده در سامانه نیلمان ،خدمات تعیین شده را برای کاربر متقاضی انجام دهد. در صورت هرگونه تخلف، اعم از دریافت وجه اضافی و یا انجام خدمات اضافی ،زیباکار ملزم به مسترد نمودن مابه التفاوت به شرکت میباشد.
          ‎۳-۴- با توجه به این که شرکت تنها واسط انعقاد قرارداد میان کاربر متقاضی با زیباکاران بوده و هر سفارش قرارداد مستقلی بین متقاضی و زیباکار است و از این رو هر یک از ایشان ساعات مورد نظر خود برای ارائه/ دریافت خدمت را به شرکت اعلام می نمایند و شرکت حسب برنامه زمانی اعلامی ایشان، نسبت به متصل کردن متقاضی به زیباکار اقدام می نماید، زیباکار نمی تواند پس از ثبت سفارش نسبت به لغو آن اقدام نماید.
          ‎۴-۴- زیباکار ملتزم است برای احراز صلاحیت خود در رسته خدمت مورد نظر، گواهی‌نامه دریافتی برای گذران دوره های آموزشی مربوطه نزد مراکز معتبر را به شرکت ارائه نماید و همواره نسبت به روزسانی آنها اقدام نماید.
          ‎۵-۴- زیباکار در پروفایل مخصوص خود و در تبلیغ خدمات مطلقا نمی‌تواند از تصاویر مربوط به نمونه کار دیگر سالن‌ها/مجریان استفاده نماید. در غیر این صورت، شرکت رأسا مجاز به اصلاح یا حذف تصاویر یا محتوای منتشر شده توسط زیباکار می باشد و در صورت هر گونه ادعا یا اعتراض، مسئولیت پاسخگویی منحصرا با زیباکار خواهد بود و شرکت مسئولیتی در این زمینه نخواهد داشت.
          ‎۶-۴- زیباکار در تبلیغ خدمات خود می بایست قوانین جمهوری اسلامی ایران را رعایت نماید و از انتشار تصاویر غیرمتعارف، خلاف فرهنگ عمومی جامعه و منافی با شئون جامعه خودداری نماید. در غیر این صورت، موضوع مشمول حکم مقرر در بند پیش است.
          ‎۷-۴- زیباکار متعهد است بهترین کیفیت را به کاربران متقاضی ارائه نماید و در صورت عدم رضایت کاربر متقاضی، به طرق مقتضی رضایت ایشان را جلب نماید.
          تبصره: چنانچه کاربر متقاضی از خدمات دریافت شده رضایت نداشت و درخواست تصحیح خدمات را نمود،پس از بررسی ناظر شرکت و در صورت تایید درخواست کاربر متقاضی،زیباکار ملتزم به حضور مجدد در محل و اصلاح خدمات بدون دریافت وجه اضافه میباشد؛بدیهی است در صورت عدم پذیرش کاربر متقاضی ، زیباکار جایگزین به مجل اعزام و مبلغ دریافتی از کاربر متقاضی به زیباکار جایگزین پرداخت میشود و زیباکار اول هیچ گونه ادعایی در این مورد نخواد داشت.
          ‎۸-۴- زیباکار با ثبت نام در سامانه نیلمان و عقد قرارداد صراحتا اظهار می‌نماید که در سلامت کامل بوده و مانعی برای فعالیت وی از لحاظ موازین بهداشتی و مطابق مقررات وزارت بهداشت وجود ندارد. زیباکارملزم به ارائه کارت بهداشت و گواهی عدم سؤپیشینه به شرکت میباشد.
          ‎۹-۴- زیباکارمتعهد است تمامی پروتکل‌های بهداشتی را در طول ارائه خدمات به کاربر متقاضی رعایت نماید.
          ‎۱۰-۴- زیباکار متعهد است برابر سفارش کاربر متقاضی نسبت به ارائه خدمات اقدام نماید.
          ‎تبصره: در صورتی که کاربر متقاضی درخواست دریافت سرویس از یک زیباکار خاص در یک زمان خاص باشد، زیباکار ملزم است ترتیب ارائه خدمت به متقاضی را فراهم آورد.
          ‎۱۱-۴- زیباکار نمی‌تواند تحت هیچ عنوان کاربر متقاضی را به لغو درخواست در سامانه نیلمان تشویق نماید یا از هر طریق تلاش نماید که کاربر متقاضی را برای دفعات بعدی به جای استفاده از سامانه نیلمان به مراجعه مستقیم و یا تماس مستقیم با وی تشویق کند.
          تبصره: در صورت احراز این مساله شرکت حق فسخ قرارداد و ادعای حقوقی را برای خود قائل میباشد.
          ‎۱۲-۴- زیباکار می‌بایست حق استفاده و بهره‌برداری از نرم‌افزار را مطابق قراردادهای فیمابین به شرکت پرداخت نماید.
          ‎۱۳-۴- با توجه به این که زیباکار با ثبت نام در سامانه نیلمان تنها مجوز استفاده غیر انحصاری و محدود از این نرم‌افزار را دارد، در غیر موارد مصرح در قرارداد فیمابین اجازه استفاده از نام و علامت تجاری و خدمات نرم‌افزاری نیلمان را نخواهد داشت.
          ‎۱۴-۴- با توجه به این که شرکت تنها کاربران متقاضی را به زیباکار معرفی می‌نماید لذا زیباکار نمی‌تواند تحت عناوینی چون رابطه استخدامی، پیمانکاری و مشارکت مدعی حقی نسبت به شرکت باشد.
          ‎۱۵-۴- زیباکار می‌پذیرد قرارداد حاضر، یک قرارداد قابل رجوع و جایز از سوی شرکت بوده و شرکت می‌تواند هر زمان تنها به صلاحدید خود و بدون نیاز به تدارک هیچ گونه دلیلی، یک حساب کاربری را مسدود نموده، مانع استفاده کاربر از خدمات نیلمان گردد.
          ‎۱۶-۴- با توجه به این که سامانه نیلمان به عنوان یک واسط تنها کاربر متقاضی را به زیباکار متصل می نماید، نمی‌تواند صلاحیت کاربر متقاضی را تضمین و پاسخگوی اعمال و رفتار وی در قبال زیباکار باشد و از این رو هیچ گونه مسئولیت حقوقی و کیفری در این خصوص متوجه شرکت نخواهد بود.
          ‎۱۷-۴- زیباکار متعهد است یک شماره شبا به نام خود به شرکت معرفی نماید تا از آن جهت واریز ‌مبالغ خدمات دریافتی پس از کسر مبلغ تعیین شده برای شرکت استفاده شود؛زیباکار اقرار می‌نماید که واریز به این حساب، به منزله پرداخت به شخص ایشان بوده و ذمه شرکت با واریز وجوه موصوف به این حساب، بری می شود و کاربر نمی تواند در آینده مدعی عدم پرداخت گردد.
          ‎۱۸-۴- با توجه به این که دارا بودن گواهی عدم سو پیشینه کیفری از شرایط لازم برای همکاری با زیباکار است، در این راستا زیباکار به شرکت اجازه می‌دهد اطلاعات ثبت نامی را جهت اخذ استعلام صلاحیت به مراجع ذی‌صلاح (مستقیما یا با واسطه شرکت‌های معرفی شده از سوی این مراجع) ارسال نماید.
          ‎۱۹-۴- زیباکار متعهد است در استفاده از خدمات نیلمان، تمامی قوانین جمهوری اسلامی ایران را رعایت نموده، نرم‌افزار را برای اهداف قانونی به کار گیرد. بدیهی است در صورتی که زیباکار در طول ارائه خدمت به کاربر متقاضی، مرتکب رفتاری گردد که از نظر قوانین ایران جرم تلقی گردد، شرکت در این خصوص هیچ گونه مسئولیتی نخواهد داشت. مضاف بر آن، نامبرده مکلف است کلیه خسارات وارده را به شرکت را جبران نماید.
          ‎۲۰-۴- زیباکار صراحتاً اعلام می دارد که از قوانین مرتبط در حوزه فعالیت خود اعم از قوانین مالیاتی (مالیات بر درآمد و …)، صنفی و … مطلع بوده و ملزم به رعایت آن ها می باشد. در صورت عدم اجرای قوانین و مقررات مربوط از سوی کاربر، هیچگونه مسئولیتی متوجه شرکت نخواهد بود.
          ‎۲۱-۴- در صورتی که زیباکار محل انتخابی کاربر متقاضی را به لحاظ مسائل بهداشتی یا نگرانی‌های امنیتی نامناسب تشخیص دهد، مختار است نسبت به لغو درخواست اقدام و محل را ترک نماید و در هر حال نسبت به اطلاع رسانی موضوع به شرکت در اولین فرصت ممکن اقدام کند.
          ‎۲۲-۴- زیباکار مجاز است در صورتی که با مراجعه به محل کاربر متقاضی دریابد که شخص دیگری به غیر از متقاضی در انتظار ایشان است یا فرد مورد نظر آقا می باشد، محل را ترک نماید.
          ‎۲۳-۴- زیباکار مطلقا مجاز به ارائه سرویس‌های آرایشگاهی و زیبایی و بهداشتی به آقایان نمی‌باشد. در صورت اثبات خلاف، شرکت مبادرت به قطع همکاری با نامبرده می‌نماید.
          ‎۲۴-۴- با توجه به این که با استفاده از سامانه نیلمان، ساعت و محل مراجعه به کاربر متقاضی قابل پیگیری است، زیباکار مطلقا مجاز به تغییر ساعت یا محل ارائه خدمت به کاربر متقاضی نمی‌باشد، در غیر این صورت بدیهی است که در صورت بروز هرگونه اتفاق، شرکت به سبب عدم اطلاع و عدم دسترسی به اطلاعات زمان و مکان جدید قادر به مساعدت و پیگیری نمی‌باشد.

          ‎ماده ۵: حقوق و مسئولیت های کاربر متقاضی

          ‎۱-۵- کاربر متقاضی ملزم است در زمان و مکان مقرر شده حضور یابد و در صورت تمایل به لغو درخواست خود می بایست دست کم این موضوع را ظرف حداکثر ۲۴ ساعت پیش از زمان مقرر برای انجام سفارش، به شرکت اطلاع رسانی نماید.
          ‎۲-۵- با توجه به این که مشخصات آرایشگر اعزامی و زمان و مکان انجام سفارش در سامانه نیلمان ثبت و در صورت بروز حادثه در اختیار مراجع قضایی و قانونی قرار می‌گیرد، کاربر متقاضی می‌بایست برای حفظ امنیت و سلامت خود از تغییر زمان و مکان انجام سفارش یا موافقت برای اعزام شخص دیگر معرفی شده از سوی زیباکار جدا پرهیز نماید.
          ‎۳-۵- در صورتی که کاربر متقاضی متعاقب ثبت سفارش و در طول دوره ارائه خدمت، سرویس‌های دیگری را نیز از زیباکار تقاضا نماید، هزینه سرویس‌های مذکور به هزینه‌های قبلی افزوده می‌شود و نامبرده موظف به ثبت درخواست‌های افزوده شده در سامانه نیلمان می‌باشد.
          ‎۴-۵- با توجه به این که کاربر متقاضی پس از مشاهده قیمت سرویس درخواستی خود، مبادرت به ثبت درخواست می نماید، نمی‌تواند پس از ثبت سفارش یا دریافت خدمت نسبت به قیمت مذکور اعتراض نماید.
          ‎۵-۵- با توجه به حق کاربر متقاضی برای دریافت خدمات با کیفیت، نامبرده مجاز است در صورت عدم رضایت از سرویس‌های آرایشی و زیبایی دریافتی، در همان زمان موضوع را به زیباکار منتقل نماید. در صورت عدم رفع نارضایتی کاربر متقاضی موظف است نسبت به اطلاع رسانی موضوع به شرکت اقدام نماید.
          ‎تبصره: حداکثر زمان ثبت شکایت از زیباکار در خصوص ایراداتی که پس از خروج زیباکار برای کاربر متقاضی ظاهر می شود، 48 ساعت پس از پایان کار است.
          ‎۶-۵- کاربر متقاضی ملزم است در صورت نگهداری هر نوع حیوان خانگی (پت) در منزل یا محل تعیین شده برای اعزام زیباکار، این موضوع را از قبل و از طریق ثبت در سامانه نیلمان به اطلاع شرکت و زیباکار برساند در غیر این صورت زیباکار مجاز به عدم ارائه خدمت و ترک محل می‌باشد.
          ‎۷-۵- کاربر متقاضی ملتزم است در صورتی که ملاحظات خاصی برای سفارش و درخواست خود دارد، این ملاحظات را در محل تعبیه شده در سامانه نیلمان درج نماید.
          ‎۸-۵- کاربر متقاضی ملتزم است هزینه سرویس خدمات را فقط صورت اعتباری (از طریق سامانه نیلمان) پرداخت نماید.
          ‎۹-۵- کاربر متقاضی مجاز نیست حساب کاربری خود را برای استفاده در اختیار دیگر اشخاص–اعم از حقیقی و حقوقی و به‌ویژه افراد زیر ۱۸ سال–قرار دهد یا آن را به هر نحو به دیگری منتقل نماید. بدیهی است ثبت درخواست های گروهی که در سامانه پیش‌بینی شده مجاز است. در صورت تخلف، مسئولیت تمام اقدامات انجام شده از سوی این اشخاص، به‌عهده صاحب حساب کاربری خواهد بود.
          ‎۱۰-۵- کاربر متقاضی متعهد است که در استفاده از سامانه نیلمان تمامی قوانین جمهوری اسلامی ایران را رعایت کند، نرم‌افزار را برای اهداف قانونی به‌کار گیرد. مسئولیت هر نوع اقدام کاربر که منجر به بروز آسیب بدنی، جانی یا مالی به اشخاص گردد، به‌عهده کاربر است و شرکت در این خصوص مسئولیتی نخواهد داشت.
          ‎۱۱-۵- کاربر متقاضی می پذیرد قرارداد حاضر، یک قرارداد قابل رجوع و جایز از سوی شرکت بوده و شرکت می تواند هر زمان تنها به صلاحدید خود و بدون نیاز به تدارک هیچ گونه دلیلی، یک حساب کاربری را مسدود نموده، مانع استفاده کاربر از خدمات زیب نیلمان گردد.
          ‎۱۲-۵- کاربر متقاضی مطلقا مجاز به ذخیره اطلاعات تماس زیباکارانی که در نتیجه استفاده از سامانه نیلمان به دست آورده، نمی باشد و بدینوسیله متعهد می گردد خارج از سامانه نیلمان با زیباکار تماس برقرار ننماید.
          ‎۱۳-۵- استعمال دخانیات یا مشروبات الکی حین دریافت خدمات برای کاربر متقاضی ممنوع است. متقابلا کاربر متقاضی می تواند در صورت مشاهده استعمال دخانیات یا مشروبات الکی از سوی زیباکار مراتب را بلافاصله به شرکت اطلاع دهد.
          ‎۱۴-۵- کاربر متقاضی می‌‌پذیرد که بسته‌های تشویقی که از سوی شرکت به کاربر متقاضی تخصیص یافته است، برای استفاده شخصی وی در نظر گرفته شده و به همین دلیل می‌‌بایست از انتقال و فروش آن‌ها اجتناب نماید. همچنین نامبرده نمی‌‌تواند وجه معادل بسته‌های تشویقی را از شرکت مطالبه نماید.
          ‎۱۵-۵- کاربر متقاضی می‌‌پذیرد که اعتبار موجود در حساب کاربری متعلقه منحصراً جهت بهره‌گیری از سامانه نیلمان قابل استفاده است و حق مطالبه دریافت نقدی این وجوه را نخواهد داشت.
          ‎۱۶-۵- مسئولیت نگهداری از اموال متعلق به کاربر متقاضی در طول دریافت ارائه سرویس های آرایشی و زیبایی با شخص وی بوده و می بایست کلیه اقدامات احتیاطی در این خصوص را به عمل آورد.بدیهی است در صورت عدم رعایت موارد امنیتی ،مسئولیت حقوقی و قضایی متوجه شرکت نخواهد بود.

          ‎ماده ۶: حقوق و مسئولیت های شرکت

          ‎۱-۶- شرکت حداکثر تلاش خود را برای ارائه خدمات نرم‌افزاری با کیفیت به کاربران به کار می‌گیرد لیکن شرکت نمی‌تواند ضامن عملکرد نرم‌افزار در تمامی سخت افزارها، شبکه های ارتباطی و گوشی‌های تلفن همراه باشد.
          ‎۲-۶- شرکت ملزم به ارائه آموزش رایگان به زیباکاران برای استفاده از نرم‌افزار می‌باشد.
          ‎۳-۶- چنانچه کاربر متقاضی از سرویس های آرایشی و زیبایی رضایت نداشته باشد و این نارضایتی ناشی از عدم انطابق کامل سرویس ارائه شده با سفارش ثبت شده باشد، کاربر متقاضی این امر را فوراً به شرکت اطلاع داده و شرکت پس از بررسی و احراز صحت موضوع، مساعی خود را از طرقی مانند ارائه سرویس از جانب زیباکار دیگر، در جهت حصول رضایت کاربر متقاضی به کار خواهد بست؛ در غیر اینصورت وجه پرداختی نهایتا ظرف ۷ روز کاری به کاربر متقاضی مسترد خواهد شد.
          ‎۴-۶- با توجه به این که شرکت از طریق سامانه نیلمان تنها زمینه اتصال کاربر متقاضی به زیباکار را فراهم می‌آورد و قرارداد دریافت سرویس‌های آرایشگاهی و زیبایی فیمابین کاربر متقاضی از یک سو و زیباکاران حسب مورد، از سوی دیگر منعقد می‌گردد، شرکت هیچ گونه مسئولیت حقوقی یا کیفری یا قضایی در برابر اعمال ایشان در قبال یکدیگر ندارد و در صورت بروز جرم یا خسارت، اشخاص مرتکب شخصا پاسخگو و مسئول خواهند بود.
          ‎۵-۶- شرکت متعهد به حفظ و حراست از اطلاعاتی است که کاربران در خلال استفاده از سامانه نیلمان در اختیار شرکت قرار داده‌اند و نمی‌تواند از این اطلاعات جز برای افزایش کیفیت خدمات خود استفاده نماید. بدیهی است در صورت درخواست مراجع قانونی برای دریافت اطلاعات، شرکت در حدود دستور قضایی عمل خواهد نمود.
          ‎۶-۶- در صورت مراجعه کاربران به مراجع قضایی و درخواست اطلاعات مربوط به سفارش‌ها، شرکت تنها قادر به ارائه اطلاعاتی خواهد بود که کاربران در سامانه نیلمان ثبت نموده اند. از این رو در صورتی که کاربر متقاضی با زیباکار خارج از سامانه نیلمان ارتباط برقرار نماید یا زمان و مکان سفارش را با توافق مستقیم با زیباکار تغییر دهد، شرکت به سبب عدم دسترسی به این اطلاعات تبعا نمی‌تواند در این خصوص مساعدتی به عمل آورد.
          ‎۷-۶- مالکیت مادی و معنوی سامانه نیلمان، نام، علامت تجاری و خدمات ارائه‌شده تحت این نام و مانند آن همگی متعلق به شرکت زیباگستر سبز وارنا است لذا شرکت حق شکایت علیه کلیه افرادی را که به هر نحو نرم‌افزارهای نیلمان را تغییر دهند، بازتولید یا بازنویسی کنند یا از آن برای تولید یک برنامه مشابه استفاده نمایند یا تلاش نمایند به سرویس ها، برنامه‌ها و شبکه مرتبط با سرورهای این شرکت به صورت غیرمجاز دسترسی بیابند یا از این برنامه درون برنامه دیگری استفاده نمایند، برای خود محفوظ می دارد.
          ‎۸-۶- شرکت مجاز به تغییر شرایط و مقررات استفاده از سامانه نیلمان در طول زمان می‌باشد و این تغییرات را از طریق یکی از شیوه‌های ارسال پیامک، ایمیل، بارگذاری شرایط جدید در وبسایت و اپلیکیشن اطلاع‌رسانی می‌نماید. صرف استفاده کاربران از اپلیکیشن پس از تغییر شرایط استفاده و اطلاع‌رسانی آن به منزله پذیرش شرایط استفاده جدید می‌باشد.

          ‎ماده ۷- حفاظت از داده‌ها و اطلاعات کاربران

          شرکت متعهد می‌گردد برای حفاظت از داده‌های کاربران که به صورت مستقیم یا غیرمستقیم و در خلال ارائه خدمت به دست آورده اقدامات احتیاطی لازم را به عمل آورده، اطلاعات مذکور را جز در موارد ذیل استفاده ننماید:
          * داده‌هایی که مستقیماً از کاربران أخذ می‌شود مانند مشخصات فردی (نام و نام خانوادگی و کدملی)، پست الکترونیک و شماره تلفن همراه برای احراز هویت و متعاقبا در طول ارائه خدمت برای هماهنگی میان کاربران متقاضی و زیباکار مورد استفاده قرار می گیرد.
          * داده‌ها و اطلاعاتی که به‌طور غیرمستقیم و در نتیجه استفاده کاربران از خدمات نیلمان در این برنامه ذخیره می‌‌شود مانند نشانی مکان منتخب کاربر متقاضی، زمان شروع و پایان یک خدمت، طول زمان ارائه خدمت، هزینه ایاب و ذهاب هزینه سرویس، تراکنش های مالی صورت گرفته و … برای بهبود کیفیت خدمات در سامانه ذخیره، تحلیل و از آن استفاده می شود.
          * در صورتی که حسب نیاز بخشی از فرایند ارائه خدمات به دیگر اشخاص سپرده شود، شرکت مطابق با اصول، قوانین و مقررات صیانت از حریم خصوصی و حفاظت از داده‌ها بر فعالیت این اشخاص نظارت می‌نماید و اقدامات احتیاطی لازم برای حفظ محرمانگی این اطلاعات را به کار خواهد بست.
          ‎تبصره: در صورتی که مقامات قضایی و یا اداری به حکم قانون، داده‌ها و یا اطلاعات مربوط به کاربر یا کاربران خاصی را از شرکت مطالبه نمایند، شرکت مطابق با قانون موظف به افشای آنها به مقامات صالح می‌باشد.

          ‎ماده ۸- قانون حاکم و شیوه حل اختلاف

          ‎۱-۸- شرایط استفاده حاضر از هر نظر تابع قوانین جمهوری اسلامی ایران خواهد بود. در موارد سکوت در قوانین یا شرایط استفاده حاضر، موضوع تابع عرف حاکم در این صنعت خواهد بود.
          ‎۲-۸- در صورت بروز اختلاف فیمابین کاربر متقاضی و زیباکار و نیز هر یک از کاربران با شرکت،طرفین بدوا تلاش خواهند نمود به صورت مسالمت‌آمیز و از طریق مذاکره نسبت به حل و فصل اختلاف اقدام نمایند و در غیر این صورت مراجع قضایی صالح مسئول رسیدگی خواهند بود.

        </p>
      </main>
    </>
  );
};

export default Rules;
