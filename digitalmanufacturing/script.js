// Component data - In a real implementation, this would come from a database
const componentData = {
    'top-case': {
        id: 'TC-0876-A',
        name: 'Top Case Assembly',
        date: '2024-06-10',
        printer: 'Creality Ender 3 V2',
        file: 'phone_top_v2.1.gcode',
        operations: [
            { date: '2024-06-10 09:30', operation: '3D Printing started', duration: '7h 15m' },
            { date: '2024-06-10 16:45', operation: 'Print completed', duration: null },
            { date: '2024-06-11 10:00', operation: 'Support removal', duration: '45m' },
            { date: '2024-06-11 11:30', operation: 'Sanding and smoothing', duration: '2h' },
            { date: '2024-06-12 14:00', operation: 'Assembly with components', duration: '1h 30m' }
        ],
        qualityChecks: [
            { check: 'Dimensional accuracy', status: 'Pass', inspector: 'QC-01' },
            { check: 'Surface finish', status: 'Pass', inspector: 'QC-02' },
            { check: 'Mounting points', status: 'Pass', inspector: 'QC-01' },
            { check: 'Weight verification', status: 'Pass', inspector: 'QC-03' }
        ]
    },
    'bottom-case': {
        id: 'BC-0876-B',
        name: 'Bottom Case Assembly',
        date: '2024-06-11',
        printer: 'Prusa i3 MK3S+',
        file: 'phone_bottom_v2.1.gcode',
        operations: [
            { date: '2024-06-11 14:00', operation: '3D Printing started', duration: '6h 45m' },
            { date: '2024-06-11 20:45', operation: 'Print completed', duration: null },
            { date: '2024-06-12 09:00', operation: 'Support removal', duration: '30m' },
            { date: '2024-06-12 10:30', operation: 'Sanding and smoothing', duration: '1h 45m' },
            { date: '2024-06-12 14:30', operation: 'Assembly with components', duration: '2h' }
        ],
        qualityChecks: [
            { check: 'Dimensional accuracy', status: 'Pass', inspector: 'QC-01' },
            { check: 'Surface finish', status: 'Pass', inspector: 'QC-02' },
            { check: 'USB-C port fit', status: 'Pass', inspector: 'QC-01' },
            { check: 'Weight verification', status: 'Pass', inspector: 'QC-03' }
        ]
    },
    'internal-frame': {
        id: 'IF-0876-C',
        name: 'Internal Reinforcement',
        date: '2024-06-09',
        printer: 'Creality Ender 3 V2',
        file: 'internal_frame_v2.1.gcode',
        operations: [
            { date: '2024-06-09 16:00', operation: '3D Printing started', duration: '3h 20m' },
            { date: '2024-06-09 19:20', operation: 'Print completed', duration: null },
            { date: '2024-06-10 10:00', operation: 'Thread tapping (M2)', duration: '1h' },
            { date: '2024-06-10 11:30', operation: 'Cleaning and inspection', duration: '30m' }
        ],
        qualityChecks: [
            { check: 'Thread quality', status: 'Pass', inspector: 'QC-01' },
            { check: 'Structural integrity', status: 'Pass', inspector: 'QC-03' },
            { check: 'Weight verification', status: 'Pass', inspector: 'QC-02' }
        ]
    },
    'buttons': {
        id: 'BT-0876-D',
        name: 'Button Set (4 pcs)',
        date: '2024-06-08',
        printer: 'Anycubic Photon Mono X',
        file: 'buttons_set.gcode',
        operations: [
            { date: '2024-06-08 20:00', operation: 'Resin printing started', duration: '2h 15m' },
            { date: '2024-06-08 22:15', operation: 'Print completed', duration: null },
            { date: '2024-06-09 09:00', operation: 'Washing and curing', duration: '1h' },
            { date: '2024-06-09 11:00', operation: 'Sanding for smooth action', duration: '1h 30m' },
            { date: '2024-06-12 15:00', operation: 'Installation in case', duration: '45m' }
        ],
        qualityChecks: [
            { check: 'Button action smoothness', status: 'Pass', inspector: 'QC-02' },
            { check: 'Consistency across set', status: 'Pass', inspector: 'QC-01' },
            { check: 'Surface finish', status: 'Pass', inspector: 'QC-02' }
        ]
    }
};

// Modal functions
function showDetails(componentKey) {
    const component = componentData[componentKey];
    if (!component) return;
    
    // Update modal title
    document.getElementById('modal-title').innerHTML = `<i class="fas fa-cube"></i> ${component.name}`;
    
    // Update basic information
    document.getElementById('detail-id').textContent = component.id;
    document.getElementById('detail-date').textContent = component.date;
    document.getElementById('detail-printer').textContent = component.printer;
    document.getElementById('detail-file').textContent = component.file;
    
    // Update operations timeline
    const timeline = document.getElementById('operations-timeline');
    timeline.innerHTML = '';
    
    component.operations.forEach(op => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.innerHTML = `
            <div class="timeline-date">${op.date}</div>
            <div class="timeline-operation">
                <strong>${op.operation}</strong>
                ${op.duration ? `<span style="color: #666; font-size: 0.9rem;"> (Duration: ${op.duration})</span>` : ''}
            </div>
        `;
        timeline.appendChild(timelineItem);
    });
    
    // Update quality checks
    const checksList = document.getElementById('quality-checks');
    checksList.innerHTML = '';
    
    component.qualityChecks.forEach(check => {
        const checkItem = document.createElement('div');
        checkItem.className = 'check-item';
        checkItem.innerHTML = `
            <i class="fas fa-${check.status === 'Pass' ? 'check-circle' : 'times-circle'}"></i>
            <div style="flex: 1;">
                <div><strong>${check.check}</strong></div>
                <div style="font-size: 0.9rem; color: #666;">Inspector: ${check.inspector}</div>
            </div>
            <span class="status-badge ${check.status === 'Pass' ? 'completed' : 'pending'}">${check.status}</span>
        `;
        checksList.appendChild(checkItem);
    });
    
    // Show modal
    document.getElementById('component-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('component-modal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('component-modal');
    if (event.target === modal) {
        closeModal();
    }
}

// QR Generator Page functionality
if (window.location.pathname.includes('qr-generator.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        const qrForm = document.getElementById('qr-form');
        const qrResult = document.getElementById('qr-result');
        const qrImage = document.getElementById('qr-image');
        const qrText = document.getElementById('qr-text');
        const downloadBtn = document.getElementById('download-qr');
        
        qrForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const deviceId = document.getElementById('device-id').value;
            const model = document.getElementById('model').value;
            const date = document.getElementById('date').value;
            
            // Generate QR data URL
            const qrData = `https://your-username.github.io/phone-traceability/?id=${encodeURIComponent(deviceId)}`;
            
            // In a real implementation, use a QR library like qrcode.js
            // For demo purposes, we'll create a visual representation
            qrImage.style.background = `linear-gradient(45deg, 
                #4a6cf7 25%, transparent 25%, 
                transparent 75%, #4a6cf7 75%, #4a6cf7),
                linear-gradient(45deg, 
                #4a6cf7 25%, white 25%, 
                white 75%, #4a6cf7 75%, #4a6cf7)`;
            qrImage.style.backgroundSize = '20px 20px';
            qrImage.style.backgroundPosition = '0 0, 10px 10px';
            
            qrText.textContent = deviceId;
            
            // Update QR info
            document.getElementById('result-device-id').textContent = deviceId;
            document.getElementById('result-model').textContent = model;
            document.getElementById('result-date').textContent = date;
            document.getElementById('result-url').textContent = qrData;
            
            qrResult.style.display = 'block';
            
            // Scroll to result
            qrResult.scrollIntoView({ behavior: 'smooth' });
        });
        
        downloadBtn.addEventListener('click', function() {
            alert('In a real implementation, this would download the QR code image.');
            // Actual implementation would use a QR code generation library
        });
    });
}
