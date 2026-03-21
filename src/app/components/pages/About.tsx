import { Users, Target, Award, TrendingUp } from 'lucide-react';

export default function About() {
  const stats = [
    { label: 'Let poslovanja', value: '30+' },
    { label: 'Prodanih izdelkov', value: '10M+' },
    { label: 'Zadovoljnih strank', value: '50K+' },
    { label: 'Držav servisiranja', value: '25+' },
  ];

  const values = [
    {
      icon: Users,
      title: 'Stranka na prvem mestu',
      description: 'Zadovoljstvo strank je naša prednostna naloga',
    },
    {
      icon: Target,
      title: 'Natančnost in kakovost',
      description: 'Vsak izdelek ustreza najvišjim standardom kakovosti',
    },
    {
      icon: Award,
      title: 'Vodilni v industriji',
      description: 'Priznana odličnost v proizvodnji pritrdilnih elementov',
    },
    {
      icon: TrendingUp,
      title: 'Inovativnost',
      description: 'Nenehno izboljšujemo naše izdelke in procese',
    },
  ];

  const team = [
    {
      name: 'Matija Brišar Vobovnik',
      role: 'Direktor in ustanovitelj',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Amalia_Hermannsthal_-_Matija_%C4%8Cop.jpg/250px-Amalia_Hermannsthal_-_Matija_%C4%8Cop.jpg',
    },
    {
      name: 'Aljaž Jagodič',
      role: 'Direktor operativ',
      image:
        'https://www.dnevnik.si/media/2025/06/27/750353/Wide-2606_nen_04-1000.webp?1751267441',
    },
    {
      name: 'Mihael Ivanović',
      role: 'Vodja inženiringa',
      image:
        'https://www.midpoint-institute.eu/upItems/imgs/008/Milos_Ivanovic_photo_square.jpg',
    },
    {
      name: 'Jaša Dobaj',
      role: 'Vodja logistike',
      image:
        'https://media.licdn.com/dms/image/v2/D4D03AQGrq0goILBGGQ/profile-displayphoto-scale_200_200/B4DZuXTFMzH4AY-/0/1767769920872?e=2147483647&v=beta&t=0TPsDehNZAUUmYKKyFxFIC0Dm-o9e3HDfcNXigpB6_o',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/80 z-10" />
        <img
          src="https://images.unsplash.com/photo-1759411364558-38a9e2b04f76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW51ZmFjdHVyaW5nJTIwbWV0YWx3b3JrJTIwZmFjdG9yeXxlbnwxfHx8fDE3NzI3MDM3MzF8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Proizvodna obrat"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center px-4">
          <h1 className="text-5xl mb-4">O podjetju SCREWS</h1>
          <p className="text-xl text-slate-200">
            Gradimo odličnost od leta 2007
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl text-orange-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl mb-6 text-center">Naša zgodba</h2>
          <div className="space-y-4 text-slate-700 text-lg leading-relaxed">
            <p>
              Podjetje SCREWS je bilo ustanovljeno leta 2007 in se je iz majhne
              družinske delavnice razvilo v enega vodilnih proizvajalcev in
              dobaviteljev vrhunskih pritrdilnih elementov v Sloveniji. Naše
              potovanje se je začelo s preprosto misijo: zagotoviti izvajalcem
              in gradbenikom zanesljive, visokokakovostne vijake in žeblje, ki
              jim lahko zaupajo.
            </p>

            <p>
              V zadnjih treh desetletjih smo razširili našo ponudbo izdelkov in
              zmogljivosti, pri tem pa smo ohranili našo zavezanost kakovosti in
              storitvam strankam. Danes servisiramo tisoče strank v 25 državah,
              od posameznih izvajalcev do velikih gradbenih podjetij.
            </p>

            <p>
              Naš sodobni proizvodni obrat združuje tradicionalno obrt z moderno
              tehnologijo, kar nam omogoča proizvodnjo standardnih in
              prilagojenih pritrdilnih elementov po natančnih specifikacijah.
              Vsak izdelek je podvržen strogemu nadzoru kakovosti, da
              zagotovimo izpolnjevanje naših zahtevnih standardov.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl mb-12 text-center">Naše vrednote</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                  <value.icon className="w-8 h-8 text-orange-500" />
                </div>

                <h3 className="text-lg mb-2">{value.title}</h3>

                <p className="text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl mb-12 text-center">Vodstvena ekipa</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-100 object-cover"
                />

                <div className="p-6 text-center">
                  <h3 className="text-lg mb-1">{member.name}</h3>
                  <p className="text-slate-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}