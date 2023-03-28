// noinspection JSUnresolvedVariable

const birimler = [
  {
    name: 'Casus',
    inputEl: '#unit_input_spy',
    countEl: '#units_entry_all_spy',
    attackPower: 0,
    unit: 1,
    t: 5,
    current: null,
    canAttackAlone: false,
  },
  {
    name: 'Sovalye',
    inputEl: '#unit_input_knight',
    countEl: '#units_entry_all_knight',
    attackPower: 150,
    unit: 1,
    t: 5,
    current: null,
    canAttackAlone: false,
  },
  {
    name: 'Kilic Ustasi',
    inputEl: '#unit_input_sword',
    countEl: '#units_entry_all_sword',
    attackPower: 25,
    unit: 15,
    t: 11,
    current: null,
    canAttackAlone: true,
  },
  {
    name: 'Mizrakci',
    inputEl: '#unit_input_spear',
    countEl: '#units_entry_all_spear',
    attackPower: 10,
    unit: 20,
    t: 9,
    current: null,
    canAttackAlone: true,
  },
  {
    name: 'Baltaci',
    inputEl: '#unit_input_axe',
    countEl: '#units_entry_all_axe',
    attackPower: 40,
    unit: 15,
    t: 9,
    current: null,
    canAttackAlone: true,
  },
  {
    name: 'Haffi Atli',
    inputEl: '#unit_input_light',
    countEl: '#units_entry_all_light',
    attackPower: 130,
    unit: 5,
    t: 5,
    current: null,
    canAttackAlone: true,
  }
];

birimler.forEach((birim, i) => {
  const mevcut = $(birim.countEl).text().trim() || '(0)';
  const mevcutVal = mevcut.substring(1, mevcut.length - 1);

  birimler[i].current = parseInt(mevcutVal) || 0;
});

const targetJSON = localStorage.getItem('TW_BARBAR_TAGETS');

if (!targetJSON) {
  bitir('Hedef verisi bulunamadi.');
}

const targets = JSON.parse(targetJSON);

let saldirildi = false;

targets.forEach(target => {
  if (saldirildi) {
    return;
  }

  const isAttacking = $('#commands_outgoings').text().includes(`(${target.x}|${target.y})`);

  if (isAttacking) {
    return;
  }

  saldirildi = true;
  smartBirimler();
  document.forms[0].x.value = target.x;
  document.forms[0].y.value = target.y;

  setTimeout(() => {
    $('#target_attack').click();
  }, 250);

  throw Error('Saldirdik');
});

function smartBirimler() {
  let yeterinceVarMi = false;

  birimler.forEach((b) => {
    if (yeterinceVarMi) {
      return;;
    }

    if (!b.current) {
      return;
    }

    if (b.unit > b.current) {
      return;
    }

    $(b.inputEl).val(b.unit);

    if (b.canAttackAlone) {
      yeterinceVarMi = true;
    }
  });

  if (!yeterinceVarMi) {
    bitir('Yeterince birim bulamadik :(')
  }
}

function bitir(m = 'Hata var') {
  console.error(m);
  
  window.location.reload();
  throw Error(m);
}
